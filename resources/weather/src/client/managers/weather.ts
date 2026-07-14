import { PVGame } from '@lib/client';
import { awaitUI } from '@lib/client/comms/ui';
import { onSocket } from '@lib/client/comms/ui';

import {
  BiomeNames,
  BiomeType,
  BiomeWeatherVariants,
  WeatherType,
  WeatherVariants,
  findWeatherTransitionPath,
} from '../../shared/biome';
import { WeatherHashes } from '../../shared/biome';
import { BiomeWeatherGrid } from '../../shared/grid';
import type { GridCell } from '../../shared/types';

/** Duration in ms for each hop in a multi-step weather transition */
const HOP_DURATION_MS = 700;

/**
 * Width of the "near a midline" band as a fraction of cell half-width.
 * If a position offset is below this on a given axis, that axis is "weak"
 * and contributes nothing to neighbor selection.
 */
const MIDLINE_BAND = 0.25;

/**
 * How close the two axis offsets must be (in normalized cell-half units)
 * before heading is consulted to break the tie between the X-axis cardinal
 * (E/W) and the Y-axis cardinal (N/S). Outside this band the dominant axis
 * wins outright. Diagonals are never picked — only cardinal neighbors.
 */
const TIEBREAK_BAND = 0.2;

/**
 * A single step in a weather transition sequence.
 * Each step slides the percent between slotA and slotB.
 */
interface TransitionStep {
  slotA: WeatherType;
  slotB: WeatherType;
  fromPercent: number;
  toPercent: number;
}

interface PlayerWeatherState {
  currentCell: { x: number; y: number };
  previousCell: { x: number; y: number } | null;
  targetNeighborCell: { x: number; y: number } | null;
  currentWeather: WeatherType;
  targetWeather: WeatherType | null;
  transitionPercent: number;
  biome: BiomeType;
  transitionPhase: 'approaching' | 'crossed' | 'settled';
}

export class ClientWeatherManager {
  protected static instance: ClientWeatherManager;

  private initialized = false;

  private weatherGrid: BiomeWeatherGrid;

  // Per-player weather state tracking
  private playerWeatherStates: Map<number, PlayerWeatherState> = new Map();

  // Debug logging throttle
  private lastLogTime: number = 0;

  // Legacy state for compatibility
  private currentWeather: WeatherType = WeatherType.SUNNY;
  private neighborWeather: WeatherType | null = null;
  private lastTransitionPercent: number = 0.1;

  // Smooth transition engine state
  private transitionQueue: TransitionStep[] = [];
  private transitionTickId: number | null = null;
  private transitionStepStartTime: number = 0;

  static getInstance(): ClientWeatherManager {
    if (!ClientWeatherManager.instance) {
      ClientWeatherManager.instance = new ClientWeatherManager();
    }
    return ClientWeatherManager.instance;
  }

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      if (resourceName === GetCurrentResourceName()) {
        this.cancelTransition();
      }
    });

    // Listen for grid updates from socket server (via UI forwarding)
    // Only updates the grid data — the spatial system handles rendering.
    onSocket('weather.grid-update', (grid) => {
      console.log('Received weather grid update from socket server');
      this.weatherGrid.setGrid(grid as unknown as GridCell[][]);
    });

    // Listen for freeze state changes
    onSocket('weather.freeze-state', (frozen: boolean) => {
      console.log(`[Weather] Weather evolution ${frozen ? 'frozen' : 'unfrozen'}`);
    });

    // Listen for global weather override changes
    onSocket('weather.global-override', (weather: string | null) => {
      this.cancelTransition();
      if (weather) {
        console.log(`[Weather] Global override set to ${weather}`);
        const weatherType = weather as WeatherType;
        this.setAllCellsToWeatherType(weatherType);
        this.resetPlayerStatesToWeather(weatherType);
        this.transitionToWeather(weatherType, 0.0);
      } else {
        console.log('[Weather] Global override removed');
        this.forceWeatherFromGrid();
      }
    });

    this.weatherGrid = new BiomeWeatherGrid();

    if (!this.initialized) {
      this.requestWeatherGrid();
      this.initialized = true;
    }
  }

  public async requestWeatherGrid(): Promise<void> {
    if (!this.weatherGrid) {
      return;
    }

    const result = await awaitUI('weather.request-grid');
    this.weatherGrid.setGrid(result.grid as unknown as GridCell[][]);
    this.forceWeatherFromGrid();
  }

  /**
   * Apply weather from the current grid position.
   * Only used on first init to snap immediately. Subsequent grid updates
   * just update the grid data — the spatial system handles rendering.
   */
  private forceWeatherFromGrid(): void {
    if (!this.weatherGrid) {
      console.warn('Cannot force weather: grid not initialized');
      return;
    }

    const playerPed = PlayerPedId();
    const coords = PVGame.playerCoords(true);

    const currentGridPos = this.weatherGrid.worldToGrid(coords.x, coords.y);
    const currentCell = this.weatherGrid.getCellAtPosition(coords.x, coords.y);

    // Initialize or update player state
    const playerState: PlayerWeatherState = {
      currentCell: currentGridPos,
      previousCell: null,
      targetNeighborCell: null,
      currentWeather: currentCell.weather,
      targetWeather: null,
      transitionPercent: 0.0,
      biome: currentCell.biome,
      transitionPhase: 'settled',
    };
    this.playerWeatherStates.set(playerPed, playerState);

    const biomeName = BiomeNames[currentCell.biome] || currentCell.biome;
    console.log(
      `[Weather] Grid init: ${currentCell.weather} in ${biomeName} at cell (${currentGridPos.x}, ${currentGridPos.y})`,
    );
    this.transitionToWeather(currentCell.weather, currentCell.rainRate);
  }

  public calculateIfWeatherShouldTransition(worldX: number, worldY: number, heading: number): void {
    if (!this.initialized || !this.weatherGrid) {
      return;
    }

    const playerId = PlayerPedId();
    const currentGridPos = this.weatherGrid.worldToGrid(worldX, worldY);
    const currentCell = this.weatherGrid.getCellAtPosition(worldX, worldY);

    // Get or initialize player state
    let playerState = this.playerWeatherStates.get(playerId);

    if (!playerState) {
      // First time seeing this player
      playerState = {
        currentCell: currentGridPos,
        previousCell: null,
        targetNeighborCell: null,
        currentWeather: currentCell.weather,
        targetWeather: null,
        transitionPercent: 0.0,
        biome: currentCell.biome,
        transitionPhase: 'settled',
      };
      this.playerWeatherStates.set(playerId, playerState);
    }

    // Detect cell change
    const cellChanged =
      playerState.currentCell.x !== currentGridPos.x || playerState.currentCell.y !== currentGridPos.y;

    if (cellChanged) {
      // Player crossed into a new cell
      this.handleCellCrossing(playerState, currentGridPos, currentCell);
    }

    // Calculate current transition state. The neighbor target is locked once
    // chosen — heading no longer kicks the transition mid-flight, since
    // neighbor selection is now position-driven (heading is only a tiebreaker
    // at the moment a target is first picked).
    const transitionInfo = this.calculateTransition(worldX, worldY, heading, playerState, currentCell);

    // Update player state
    playerState.transitionPercent = transitionInfo.transitionPercent;
    playerState.biome = currentCell.biome;

    // Apply weather if there's an active transition
    if (transitionInfo.shouldApply) {
      this.applyWeatherToPlayer({
        currentWeather: transitionInfo.currentWeather,
        neighborWeather: transitionInfo.neighborWeather,
        currentVariant: transitionInfo.currentVariant,
        neighborVariant: transitionInfo.neighborVariant,
        currentRainRate: transitionInfo.currentRainRate,
        neighborRainRate: transitionInfo.neighborRainRate,
        transitionPercent: transitionInfo.transitionPercent,
        biome: currentCell.biome,
      });

      // Log the update (throttle to avoid spam)
      const now = GetGameTimer();
      if (!this.lastLogTime || now - this.lastLogTime > 500) {
        console.log(
          `[Weather] ${transitionInfo.currentWeather} -> ${transitionInfo.neighborWeather || 'none'} ` +
            `(${(transitionInfo.transitionPercent * 100).toFixed(2)}%) ` +
            `phase: ${playerState.transitionPhase} | ` +
            `cell: (${playerState.currentCell.x},${playerState.currentCell.y}) -> (${playerState.targetNeighborCell?.x || '?'},${playerState.targetNeighborCell?.y || '?'})`,
        );
        this.lastLogTime = now;
      }
    }
  }

  /**
   * Handle player crossing from one cell to another
   */
  private handleCellCrossing(
    playerState: PlayerWeatherState,
    newGridPos: { x: number; y: number },
    newCell: GridCell,
  ): void {
    // Check if we crossed into our target neighbor cell
    const crossedIntoTarget =
      playerState.targetNeighborCell &&
      playerState.targetNeighborCell.x === newGridPos.x &&
      playerState.targetNeighborCell.y === newGridPos.y;

    if (crossedIntoTarget) {
      // We crossed into the cell we were transitioning towards
      playerState.previousCell = { ...playerState.currentCell };
      playerState.currentCell = newGridPos;
      // DON'T update currentWeather yet - we're still transitioning!
      // currentWeather stays as the OLD weather until we reach 'settled' phase
      playerState.transitionPhase = 'crossed';

      console.log(
        `[Transition] Crossed into target cell (${newGridPos.x}, ${newGridPos.y}). ` +
          `Continuing transition from ${playerState.currentWeather} -> ${playerState.targetWeather}`,
      );
      // Keep the same target to continue the transition to 0.9
    } else {
      // We crossed into a different cell (e.g., diagonal movement or unexpected path)
      // Reset the transition
      playerState.previousCell = { ...playerState.currentCell };
      playerState.currentCell = newGridPos;
      playerState.currentWeather = newCell.weather;
      playerState.targetNeighborCell = null;
      playerState.targetWeather = null;
      playerState.transitionPhase = 'settled';
      playerState.transitionPercent = 0.0;

      console.log(
        `[Transition] Crossed into non-target cell (${newGridPos.x}, ${newGridPos.y}). ` +
          `Resetting transition. New weather: ${newCell.weather}`,
      );
    }
  }

  /**
   * Calculate transition percentage and target based on player position and heading
   * Returns 0.0 (50% from edge to center) -> 0.5 (edge) -> 0.9 (50% from edge to center in neighbor)
   * This creates a transition zone in the outer 50% of each cell, leaving the inner 50% as "settled"
   */
  private calculateTransition(
    worldX: number,
    worldY: number,
    heading: number,
    playerState: PlayerWeatherState,
    currentCell: GridCell,
  ): {
    currentWeather: WeatherType;
    neighborWeather: WeatherType | null;
    currentVariant: string | null;
    neighborVariant: string | null;
    currentRainRate: number;
    neighborRainRate: number;
    transitionPercent: number;
    shouldApply: boolean;
  } {
    const cellBounds = this.weatherGrid.getCellBounds(playerState.currentCell.x, playerState.currentCell.y);

    if (!cellBounds) {
      return {
        currentWeather: currentCell.weather,
        neighborWeather: null,
        currentVariant: currentCell.variant,
        neighborVariant: null,
        currentRainRate: currentCell.rainRate,
        neighborRainRate: 0.0,
        transitionPercent: 0.0,
        shouldApply: false,
      };
    }

    // Determine which neighbor to blend with — closest corner by position,
    // with heading as a tiebreaker only when the player is near a midline.
    const targetNeighbor = this.getNeighborFromPosition(playerState.currentCell, worldX, worldY, heading, cellBounds);

    // If no valid neighbor or we're settled, no transition
    if (!targetNeighbor) {
      playerState.transitionPhase = 'settled';
      return {
        currentWeather: currentCell.weather,
        neighborWeather: null,
        currentVariant: currentCell.variant,
        neighborVariant: null,
        currentRainRate: currentCell.rainRate,
        neighborRainRate: 0.0,
        transitionPercent: 0.0,
        shouldApply: false,
      };
    }

    // Update target if not set or if we're in settled phase
    if (!playerState.targetNeighborCell || playerState.transitionPhase === 'settled') {
      playerState.targetNeighborCell = { x: targetNeighbor.x, y: targetNeighbor.y };
      playerState.targetWeather = targetNeighbor.weather;
      playerState.transitionPhase = 'approaching';
    }

    // Get target neighbor cell bounds
    const targetBounds = this.weatherGrid.getCellBounds(
      playerState.targetNeighborCell.x,
      playerState.targetNeighborCell.y,
    );

    if (!targetBounds) {
      return {
        currentWeather: currentCell.weather,
        neighborWeather: null,
        currentVariant: currentCell.variant,
        neighborVariant: null,
        currentRainRate: currentCell.rainRate,
        neighborRainRate: 0.0,
        transitionPercent: 0.0,
        shouldApply: false,
      };
    }

    // Get the target neighbor cell for variant access
    const targetNeighborCell = this.weatherGrid.getCellAtPosition(targetBounds.centerX, targetBounds.centerY);

    let transitionPercent: number;

    if (playerState.transitionPhase === 'approaching') {
      // Phase 1: Moving from 50% mark towards edge (0.0 -> 0.5)
      // Transition starts at 50% of distance from edge to center, not at true center
      const distanceFromCurrentCenter = Math.sqrt(
        Math.pow(worldX - cellBounds.centerX, 2) + Math.pow(worldY - cellBounds.centerY, 2),
      );

      const distanceBetweenCenters = Math.sqrt(
        Math.pow(targetBounds.centerX - cellBounds.centerX, 2) + Math.pow(targetBounds.centerY - cellBounds.centerY, 2),
      );

      const halfDistance = distanceBetweenCenters / 2; // Distance from center to edge
      const transitionStartDistance = halfDistance * 0.5; // Start at 50% of way from edge to center
      const transitionRange = halfDistance - transitionStartDistance; // Transition zone width

      if (distanceFromCurrentCenter < transitionStartDistance) {
        // Player is in the "settled zone" - no transition yet
        transitionPercent = 0.0;
      } else {
        // Player is in the transition zone (50% mark to edge)
        const progressInZone = distanceFromCurrentCenter - transitionStartDistance;
        transitionPercent = Math.min(0.5, (progressInZone / transitionRange) * 0.5);
      }
    } else if (playerState.transitionPhase === 'crossed') {
      // Phase 2: Moving from edge to 50% mark (0.5 -> 0.9)
      // Transition ends at 50% of distance from edge to center, not at true center
      const distanceFromCurrentCenter = Math.sqrt(
        Math.pow(worldX - cellBounds.centerX, 2) + Math.pow(worldY - cellBounds.centerY, 2),
      );

      // Get previous cell bounds to calculate the distance between centers
      const prevBounds = playerState.previousCell
        ? this.weatherGrid.getCellBounds(playerState.previousCell.x, playerState.previousCell.y)
        : null;

      if (!prevBounds) {
        // Fallback if we can't get previous cell bounds
        transitionPercent = 0.9;
      } else {
        const distanceBetweenCenters = Math.sqrt(
          Math.pow(cellBounds.centerX - prevBounds.centerX, 2) + Math.pow(cellBounds.centerY - prevBounds.centerY, 2),
        );

        const halfDistance = distanceBetweenCenters / 2; // Distance from center to edge
        const transitionEndDistance = halfDistance * 0.5; // End at 50% of way from edge to center
        const transitionRange = halfDistance - transitionEndDistance; // Transition zone width

        if (distanceFromCurrentCenter > transitionEndDistance) {
          // Still in transition zone (between edge and 50% mark)
          const distanceFromEdge = halfDistance - distanceFromCurrentCenter;
          const progressInZone = Math.max(0, distanceFromEdge);
          transitionPercent = 0.5 + (progressInZone / transitionRange) * 0.4;
          transitionPercent = Math.min(0.9, Math.max(0.5, transitionPercent));
        } else {
          // Reached the 50% mark - fully settled
          transitionPercent = 0.9;
        }
      }

      // Check if we've reached the 50% mark (settled)
      if (transitionPercent >= 0.89) {
        playerState.transitionPhase = 'settled';
        playerState.currentWeather = currentCell.weather;
        playerState.previousCell = null;
        playerState.targetNeighborCell = null;
        playerState.targetWeather = null;

        console.log(
          `[Transition] Settled at 50% mark in cell (${playerState.currentCell.x}, ${playerState.currentCell.y}). ` +
            `Weather: ${playerState.currentWeather}`,
        );

        return {
          currentWeather: playerState.currentWeather,
          neighborWeather: null,
          currentVariant: currentCell.variant,
          neighborVariant: null,
          currentRainRate: currentCell.rainRate,
          neighborRainRate: 0.0,
          transitionPercent: 0.0,
          shouldApply: false,
        };
      }
    } else {
      // Settled - no transition
      return {
        currentWeather: currentCell.weather,
        neighborWeather: null,
        currentVariant: currentCell.variant,
        neighborVariant: null,
        currentRainRate: currentCell.rainRate,
        neighborRainRate: 0.0,
        transitionPercent: 0.0,
        shouldApply: false,
      };
    }

    return {
      currentWeather: playerState.currentWeather,
      neighborWeather: playerState.targetWeather,
      currentVariant: currentCell.variant,
      neighborVariant: targetNeighborCell.variant,
      currentRainRate: currentCell.rainRate,
      neighborRainRate: targetNeighborCell.rainRate,
      transitionPercent: transitionPercent,
      shouldApply: true,
    };
  }

  /**
   * Pick which neighbor cell to blend with — always one of the four cardinal
   * neighbors (N, S, E, or W). Diagonals are never picked; weather bleeds
   * across shared edges and diagonal cells share no edge with the current
   * one.
   *
   * Selection:
   *   - both axes within MIDLINE_BAND of center → no neighbor (settled zone)
   *   - one axis dominates → cardinal pick on that axis (heading ignored)
   *   - axes roughly equal (within TIEBREAK_BAND) → heading picks between
   *     the X-axis cardinal and the Y-axis cardinal
   */
  private getNeighborFromPosition(
    currentCell: { x: number; y: number },
    worldX: number,
    worldY: number,
    heading: number,
    cellBounds: { minX: number; maxX: number; minY: number; maxY: number; centerX: number; centerY: number },
  ): { x: number; y: number; weather: WeatherType } | null {
    const halfW = (cellBounds.maxX - cellBounds.minX) / 2;
    const halfH = (cellBounds.maxY - cellBounds.minY) / 2;

    // Normalized offset from cell center, range [-1, 1] per axis
    const nx = (worldX - cellBounds.centerX) / halfW;
    const ny = (worldY - cellBounds.centerY) / halfH;

    const ax = Math.abs(nx);
    const ay = Math.abs(ny);

    // Both axes weak — player is in the inner settled zone, no transition
    if (ax < MIDLINE_BAND && ay < MIDLINE_BAND) {
      return null;
    }

    const sx = nx > 0 ? 1 : -1;
    const sy = ny > 0 ? 1 : -1;

    // Decide whether to use heading as a tiebreaker. If one axis clearly
    // dominates (offset gap >= TIEBREAK_BAND), pick that cardinal outright.
    const useHeading = ax >= MIDLINE_BAND && ay >= MIDLINE_BAND && Math.abs(ax - ay) < TIEBREAK_BAND;

    let dirX = 0;
    let dirY = 0;

    if (useHeading) {
      // RDR2 CCW heading: 0=N, 90=W, 180=S, 270=E. With gridY+ = N, the
      // forward unit vector is (-sin(h), cos(h)).
      const headingRad = (heading * Math.PI) / 180;
      const forwardX = -Math.sin(headingRad);
      const forwardY = Math.cos(headingRad);

      // Compare alignment with the two candidate cardinals
      const xCardinalDot = forwardX * sx; // E or W
      const yCardinalDot = forwardY * sy; // N or S

      if (xCardinalDot >= yCardinalDot) {
        dirX = sx;
      } else {
        dirY = sy;
      }
    } else if (ax >= ay) {
      // X axis dominates
      dirX = sx;
    } else {
      // Y axis dominates
      dirY = sy;
    }

    const neighborX = currentCell.x + dirX;
    const neighborY = currentCell.y + dirY;

    // Check grid bounds
    const gridDimensions = this.weatherGrid.getCellDimensions();
    const gridWidth = Math.round(gridDimensions.totalWidth / gridDimensions.cellWidth);
    const gridHeight = Math.round(gridDimensions.totalHeight / gridDimensions.cellHeight);

    if (neighborX < 0 || neighborX >= gridWidth || neighborY < 0 || neighborY >= gridHeight) {
      return null;
    }

    const neighborBounds = this.weatherGrid.getCellBounds(neighborX, neighborY);
    if (!neighborBounds) {
      return null;
    }

    const neighborCell = this.weatherGrid.getCellAtPosition(neighborBounds.centerX, neighborBounds.centerY);

    return {
      x: neighborX,
      y: neighborY,
      weather: neighborCell.weather,
    };
  }

  private applyWeatherToPlayer(weatherInfo: {
    currentWeather: WeatherType;
    neighborWeather: WeatherType | null;
    currentVariant: string | null;
    neighborVariant: string | null;
    currentRainRate: number;
    neighborRainRate: number;
    transitionPercent: number;
    biome: BiomeType;
  }): void {
    const {
      currentWeather: newCurrent,
      neighborWeather: newNeighbor,
      currentRainRate,
      neighborRainRate,
      transitionPercent,
      biome,
    } = weatherInfo;

    // If same weather on both sides or no neighbor, settle
    if (newCurrent === newNeighbor || newNeighbor === null) {
      return;
    }

    // Check if this is a meaningful update
    const weatherChanged = newCurrent !== this.currentWeather || newNeighbor !== this.neighborWeather;
    const percentChanged = Math.abs(transitionPercent - this.lastTransitionPercent) > 0.00000001;

    if (!weatherChanged && !percentChanged) {
      return;
    }

    // If a smooth transition is in progress, let it finish — don't fight it
    if (this.isTransitionInProgress()) {
      console.log(
        `[Apply Skip] Transition in progress, ignoring ${newCurrent} <-> ${newNeighbor} @ ${(transitionPercent * 100).toFixed(1)}%`,
      );
      return;
    }

    // Read current game state to see what slots we have
    const [currentHashA, currentHashB, currentGamePercent] = GetCurrWeatherState();
    const gameSlotA = this.hashToWeatherType(currentHashA);
    const gameSlotB = this.hashToWeatherType(currentHashB);

    if (!gameSlotA || !gameSlotB) {
      return;
    }

    // Check if either desired type is already in a slot
    const slotAMatchesCurrent = gameSlotA === newCurrent;
    const slotBMatchesCurrent = gameSlotB === newCurrent;
    const slotAMatchesNeighbor = gameSlotA === newNeighbor;
    const slotBMatchesNeighbor = gameSlotB === newNeighbor;

    const targetRainRate = currentRainRate * (1.0 - transitionPercent) + neighborRainRate * transitionPercent;

    // Update tracked state
    this.currentWeather = newCurrent;
    this.neighborWeather = newNeighbor;
    this.lastTransitionPercent = transitionPercent;

    // All paths go through the transition engine — no direct SetCurrWeatherState
    const hasCurrentInSlot = slotAMatchesCurrent || slotBMatchesCurrent;
    const hasNeighborInSlot = slotAMatchesNeighbor || slotBMatchesNeighbor;

    if (hasCurrentInSlot && hasNeighborInSlot) {
      // Both slots match — lerp the percent (transitionToTarget will skip if already there)
      this.transitionToTarget(newCurrent, newNeighbor, transitionPercent, targetRainRate);
    } else if (hasCurrentInSlot || hasNeighborInSlot) {
      // One slot matches — swap the other via engine
      console.log(
        `[Apply Swap] Game has ${gameSlotA}/${gameSlotB}, need ${newCurrent}/${newNeighbor} @ ${(transitionPercent * 100).toFixed(1)}%`,
      );
      this.transitionToTarget(newCurrent, newNeighbor, transitionPercent, targetRainRate);
    } else {
      // Neither slot matches — full multi-hop to dominant weather first
      const dominantWeather = transitionPercent < 0.5 ? newCurrent : newNeighbor;
      const dominantRainRate = transitionPercent < 0.5 ? currentRainRate : neighborRainRate;
      console.log(
        `[Apply Multi] Game has ${gameSlotA}/${gameSlotB}, need ${newCurrent}/${newNeighbor} -> hop to ${dominantWeather}`,
      );
      this.transitionToWeather(dominantWeather, dominantRainRate);
    }
  }

  /**
   * Transition the game state to a specific two-slot blend target.
   * Figures out which slot needs changing, slides to free it, swaps, then slides to target percent.
   */
  private transitionToTarget(
    targetA: WeatherType,
    targetB: WeatherType,
    targetPercent: number,
    targetRainRate: number,
  ): void {
    const [currentHashA, currentHashB, currentPercent] = GetCurrWeatherState();
    const gameSlotA = this.hashToWeatherType(currentHashA);
    const gameSlotB = this.hashToWeatherType(currentHashB);

    if (!gameSlotA || !gameSlotB) {
      this.snapToWeather(targetA, targetRainRate);
      return;
    }

    const steps: TransitionStep[] = [];

    // Best case: both slots already match (in either order) — just lerp the percent
    if (gameSlotA === targetA && gameSlotB === targetB) {
      steps.push({ slotA: targetA, slotB: targetB, fromPercent: currentPercent, toPercent: targetPercent });
    } else if (gameSlotA === targetB && gameSlotB === targetA) {
      // Slots are in reverse order — keep game's order, invert the target percent
      steps.push({ slotA: gameSlotA, slotB: gameSlotB, fromPercent: currentPercent, toPercent: 1.0 - targetPercent });
    } else if (gameSlotA === targetA) {
      // SlotA matches targetA, slotB needs to become targetB
      // Slide to 0% (fully slotA), swap slotB, slide to target percent
      if (currentPercent > 0.01) {
        steps.push({ slotA: gameSlotA, slotB: gameSlotB, fromPercent: currentPercent, toPercent: 0.0 });
      }
      steps.push({ slotA: targetA, slotB: targetB, fromPercent: 0.0, toPercent: targetPercent });
    } else if (gameSlotB === targetA) {
      // SlotB has our targetA — slide to 100% (fully slotB=targetA), swap slotA to targetB
      if (currentPercent < 0.99) {
        steps.push({ slotA: gameSlotA, slotB: gameSlotB, fromPercent: currentPercent, toPercent: 1.0 });
      }
      steps.push({ slotA: targetB, slotB: targetA, fromPercent: 1.0, toPercent: 1.0 - targetPercent });
    } else if (gameSlotA === targetB) {
      // SlotA has our targetB — slide to 0% (fully slotA=targetB), swap slotB to targetA
      if (currentPercent > 0.01) {
        steps.push({ slotA: gameSlotA, slotB: gameSlotB, fromPercent: currentPercent, toPercent: 0.0 });
      }
      steps.push({ slotA: targetB, slotB: targetA, fromPercent: 0.0, toPercent: 1.0 - targetPercent });
    } else if (gameSlotB === targetB) {
      // SlotB has our targetB — slide to 100% (fully slotB=targetB), swap slotA to targetA
      if (currentPercent < 0.99) {
        steps.push({ slotA: gameSlotA, slotB: gameSlotB, fromPercent: currentPercent, toPercent: 1.0 });
      }
      steps.push({ slotA: targetA, slotB: targetB, fromPercent: 1.0, toPercent: targetPercent });
    } else {
      // Neither slot matches — fall back to single-target transition
      this.transitionToWeather(targetA, targetRainRate);
      return;
    }

    if (steps.length === 0) return;

    // Filter out steps that are already at their target (no-ops)
    // Settle steps are only kept if the game isn't already settled on that weather
    const meaningfulSteps = steps.filter((s) => {
      if (s.slotA === s.slotB) {
        // Settle step — skip if game is already at this weather with both slots matching
        return !(gameSlotA === s.slotA && gameSlotB === s.slotB);
      }
      return Math.abs(s.fromPercent - s.toPercent) > 0.005;
    });

    if (meaningfulSteps.length === 0) {
      // Nothing to do — game is already showing the right visual
      return;
    }

    console.log(
      `[Transition Target] -> ${targetA} <-> ${targetB} @ ${(targetPercent * 100).toFixed(0)}% (${meaningfulSteps.length} steps)`,
    );
    for (const step of meaningfulSteps) {
      console.log(
        `  ${step.slotA} <-> ${step.slotB}: ${(step.fromPercent * 100).toFixed(0)}% -> ${(step.toPercent * 100).toFixed(0)}%`,
      );
    }

    this.cancelTransition();
    this.transitionQueue = meaningfulSteps;
    this.transitionStepStartTime = Date.now();
    this.startTransitionTick(targetRainRate);
  }

  /**
   * Plan and start a smooth transition from the current game weather state
   * to the target weather type. Uses BFS to find intermediate hops through
   * the compatibility graph, then slides percent per hop using setTick.
   *
   * Target state is: both slots = targetWeather, percent = 0.9 (fully settled).
   */
  private transitionToWeather(targetWeather: WeatherType, targetRainRate: number): void {
    // Read current game state
    const [currentHashA, currentHashB, currentPercent] = GetCurrWeatherState();

    // Reverse-lookup hashes to WeatherType
    const slotA = this.hashToWeatherType(currentHashA);
    const slotB = this.hashToWeatherType(currentHashB);

    if (!slotA || !slotB) {
      console.warn('[Weather Transition] Cannot identify current weather hashes, snapping directly');
      this.snapToWeather(targetWeather, targetRainRate);
      return;
    }

    // If already at target, nothing to do
    if (slotA === targetWeather && slotB === targetWeather) {
      return;
    }

    // Build the transition step queue
    const steps = this.planTransitionSteps(slotA, slotB, currentPercent, targetWeather);

    if (steps.length === 0) {
      console.warn('[Weather Transition] No valid transition path found, snapping directly');
      this.snapToWeather(targetWeather, targetRainRate);
      return;
    }

    console.log(
      `[Weather Transition] ${slotA}/${slotB}@${(currentPercent * 100).toFixed(0)}% -> ${targetWeather} ` +
        `(${steps.length} step${steps.length !== 1 ? 's' : ''}, ~${((steps.length * HOP_DURATION_MS) / 1000).toFixed(1)}s)`,
    );
    for (const step of steps) {
      console.log(
        `  ${step.slotA} <-> ${step.slotB}: ${(step.fromPercent * 100).toFixed(0)}% -> ${(step.toPercent * 100).toFixed(0)}%`,
      );
    }

    // Cancel any in-progress transition
    this.cancelTransition();

    // Start the new transition
    this.transitionQueue = steps;
    this.transitionStepStartTime = Date.now();
    this.startTransitionTick(targetRainRate);
  }

  /**
   * Plan the sequence of steps needed to get from current state to target.
   * Each step is a percent slide on two weather slots. Between steps,
   * one slot gets swapped when the percent is at 0% or 100%.
   */
  private planTransitionSteps(
    slotA: WeatherType,
    slotB: WeatherType,
    currentPercent: number,
    target: WeatherType,
  ): TransitionStep[] {
    const steps: TransitionStep[] = [];

    // If one slot already matches the target, just slide toward it
    if (slotA === target) {
      // Slide to 0% (fully slotA = target)
      if (currentPercent > 0.01) {
        steps.push({ slotA, slotB, fromPercent: currentPercent, toPercent: 0.0 });
      }
      // Final settle: both slots target
      steps.push({ slotA: target, slotB: target, fromPercent: 0.0, toPercent: 0.0 });
      return steps;
    }

    if (slotB === target) {
      // Slide to 100% (fully slotB = target)
      if (currentPercent < 0.99) {
        steps.push({ slotA, slotB, fromPercent: currentPercent, toPercent: 1.0 });
      }
      // Final settle: both slots target
      steps.push({ slotA: target, slotB: target, fromPercent: 0.0, toPercent: 0.0 });
      return steps;
    }

    // Neither slot matches. Find which slot is "closer" to target in the compatibility graph.
    const pathFromA = findWeatherTransitionPath(slotA, target);
    const pathFromB = findWeatherTransitionPath(slotB, target);

    // Determine which direction to slide first based on shorter path
    // When equal distance, prefer the slot closer to its edge (less sliding needed)
    const distA = pathFromA ? pathFromA.length - 1 : Infinity;
    const distB = pathFromB ? pathFromB.length - 1 : Infinity;
    const preferB = distB < distA || (distB === distA && currentPercent > 0.5);

    if (preferB && pathFromB) {
      // Slide to 100% (fully slotB), then walk slotA through intermediates
      if (currentPercent < 0.99) {
        steps.push({ slotA, slotB, fromPercent: currentPercent, toPercent: 1.0 });
      }

      // Now at 100% = fully slotB. Walk through path from B to target.
      // At each intermediate: swap slotA to next, slide to 0%, swap slotB to next, slide to 100%
      let currentA = slotA;
      let currentB = slotB;

      for (let i = 1; i < pathFromB.length; i++) {
        const next = pathFromB[i];
        // Swap slotA to next, slide from 100% to 0% (moving from currentB to next)
        currentA = next;
        steps.push({ slotA: currentA, slotB: currentB, fromPercent: 1.0, toPercent: 0.0 });
        // Now fully in currentA (= next). If not done, swap slotB for the next hop.
        if (i < pathFromB.length - 1) {
          currentB = currentA;
          // Next iteration will set currentA to the next step
        }
      }

      // Settle: both slots = target
      steps.push({ slotA: target, slotB: target, fromPercent: 0.0, toPercent: 0.0 });
    } else if (pathFromA) {
      // Slide to 0% (fully slotA), then walk slotB through intermediates
      if (currentPercent > 0.01) {
        steps.push({ slotA, slotB, fromPercent: currentPercent, toPercent: 0.0 });
      }

      let currentA = slotA;
      let currentB = slotB;

      for (let i = 1; i < pathFromA.length; i++) {
        const next = pathFromA[i];
        // Swap slotB to next, slide from 0% to 100% (moving from currentA to next)
        currentB = next;
        steps.push({ slotA: currentA, slotB: currentB, fromPercent: 0.0, toPercent: 1.0 });
        // Now fully in currentB (= next). If not done, swap slotA for next hop.
        if (i < pathFromA.length - 1) {
          currentA = currentB;
        }
      }

      // Settle: both slots = target
      steps.push({ slotA: target, slotB: target, fromPercent: 0.0, toPercent: 0.0 });
    }

    return steps;
  }

  /**
   * Start a setTick that lerps through the transition queue.
   */
  private startTransitionTick(targetRainRate: number): void {
    if (this.transitionQueue.length === 0) return;

    this.transitionStepStartTime = Date.now();

    this.transitionTickId = setTick(() => {
      if (this.transitionQueue.length === 0) {
        this.cancelTransition();
        return;
      }

      const step = this.transitionQueue[0];
      const elapsed = Date.now() - this.transitionStepStartTime;

      // If this is a no-op step (same from/to percent, or settle step), apply instantly and skip
      const isSettle = step.slotA === step.slotB;
      const isNoOp = Math.abs(step.fromPercent - step.toPercent) < 0.001 && !isSettle;

      if (isSettle || isNoOp) {
        const hashA = WeatherHashes[step.slotA];
        const hashB = WeatherHashes[step.slotB];
        if (hashA !== undefined && hashB !== undefined) {
          const applyPercent = isSettle ? 0.0 : step.toPercent;
          SetCurrWeatherState(hashA, hashB, Math.min(applyPercent, 0.99999), true);
          SetRain(targetRainRate);
          console.log(
            `[Transition ${isSettle ? 'Settle' : 'Swap'}] ${step.slotA} <-> ${step.slotB} @ ${(applyPercent * 100).toFixed(0)}%`,
          );
        }
        if (isSettle) {
          this.currentWeather = step.slotA;
          this.neighborWeather = null;
          this.lastTransitionPercent = 0.0;
        }
        this.transitionQueue.shift();
        this.transitionStepStartTime = Date.now();
        if (this.transitionQueue.length === 0) {
          this.cancelTransition();
        }
        return;
      }

      // Calculate lerped percent for this step
      const progress = Math.min(1.0, elapsed / HOP_DURATION_MS);
      let percent = step.fromPercent + (step.toPercent - step.fromPercent) * progress;

      // Clamp to safe range
      percent = Math.max(0.0, Math.min(0.99999, percent));

      const hashA = WeatherHashes[step.slotA];
      const hashB = WeatherHashes[step.slotB];

      if (hashA !== undefined && hashB !== undefined) {
        SetCurrWeatherState(hashA, hashB, percent, true);
        // console.log(`[Transition Hop] ${step.slotA} <-> ${step.slotB} @ ${(percent * 100).toFixed(1)}% (progress: ${(progress * 100).toFixed(0)}%)`);
      }

      // Interpolate rain toward target based on overall step progress
      // (rough approximation — becomes exact when the final settle step completes)
      SetRain(targetRainRate);

      // Step complete?
      if (progress >= 1.0) {
        this.transitionQueue.shift();
        this.transitionStepStartTime = Date.now();

        // If more steps, the next step's slot swap happens implicitly
        // (the next SetCurrWeatherState call will use the new slots)
        if (this.transitionQueue.length === 0) {
          this.cancelTransition();
        }
      }
    });
  }

  /**
   * Cancel any in-progress smooth transition.
   */
  private cancelTransition(): void {
    if (this.transitionTickId !== null) {
      clearTick(this.transitionTickId);
      this.transitionTickId = null;
    }
    this.transitionQueue = [];
  }

  /**
   * Check if a smooth transition is currently in progress.
   */
  private isTransitionInProgress(): boolean {
    return this.transitionTickId !== null && this.transitionQueue.length > 0;
  }

  /**
   * Immediately snap to a weather type with no transition.
   */
  private snapToWeather(weather: WeatherType, rainRate: number): void {
    const hash = WeatherHashes[weather];
    if (hash !== undefined) {
      ClearOverrideWeather();
      SetCurrWeatherState(hash, hash, 0.9, true);
      SetRain(rainRate);
      console.log(`[Snap Fallback] ${weather} <-> ${weather} @ 90% (no transition path available)`);
    }
    this.currentWeather = weather;
    this.neighborWeather = null;
    this.lastTransitionPercent = 0.0;
  }

  /**
   * Reverse-lookup a weather hash to its WeatherType.
   */
  private hashToWeatherType(hash: number): WeatherType | null {
    for (const [type, h] of Object.entries(WeatherHashes)) {
      if (h === hash) return type as WeatherType;
    }
    return null;
  }

  public checkWeather(): void {
    const playerPed = PlayerPedId();
    const coords = PVGame.playerCoords(true);
    const heading = GetEntityHeading(playerPed);

    const playerState = this.playerWeatherStates.get(playerPed);

    if (!playerState) {
      console.log('No weather state tracked for player yet');
      return;
    }

    const biomeName = BiomeNames[playerState.biome] || playerState.biome;

    console.log('========================================');
    console.log('WEATHER INFORMATION');
    console.log('========================================');
    console.log(`Position: ${coords.x.toFixed(1)}, ${coords.y.toFixed(1)}, ${coords.z.toFixed(1)}`);
    console.log(`Heading: ${heading.toFixed(1)}°`);
    console.log(`Current Cell: (${playerState.currentCell.x}, ${playerState.currentCell.y})`);
    console.log(`Current Biome: ${biomeName}`);
    console.log(`Current Weather: ${playerState.currentWeather}`);
    console.log(`Target Weather: ${playerState.targetWeather || 'None'}`);
    console.log(
      `Target Cell: ${playerState.targetNeighborCell ? `(${playerState.targetNeighborCell.x}, ${playerState.targetNeighborCell.y})` : 'None'}`,
    );
    console.log(`Transition Phase: ${playerState.transitionPhase}`);
    console.log(`Transition Percent: ${(playerState.transitionPercent * 100).toFixed(2)}%`);
    console.log('========================================');
  }

  /**
   * Generate an alternating checkerboard pattern of SUNNY and RAIN for testing
   * This creates high contrast weather transitions for visual verification
   */
  public generateTestPattern(): void {
    if (!this.weatherGrid) {
      console.error('Weather grid not initialized');
      return;
    }

    const grid = this.weatherGrid.getGrid();

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        // Checkerboard pattern: alternating based on (x + y) % 2
        const isEven = (x + y) % 2 === 0;
        const weatherType = isEven ? WeatherType.SUNNY : WeatherType.RAIN;
        const cellBiome = grid[y][x].biome;
        grid[y][x].weather = weatherType;

        // Assign a biome-appropriate variant if available
        const biomeVariants = BiomeWeatherVariants[cellBiome]?.[weatherType];
        let selectedVariant: string | null = null;

        if (biomeVariants && biomeVariants.length > 0) {
          selectedVariant = biomeVariants[Math.floor(Math.random() * biomeVariants.length)];
        } else {
          // Fall back to general variants
          const variants = WeatherVariants[weatherType];
          if (variants && variants.length > 0) {
            selectedVariant = variants[Math.floor(Math.random() * variants.length)];
          }
        }

        grid[y][x].variant = selectedVariant;
      }
    }

    // Update the grid
    this.weatherGrid.setGrid(grid);

    console.log('========================================');
    console.log('TEST PATTERN GENERATED');
    console.log('========================================');
    console.log('Weather grid set to alternating SUNNY/RAIN pattern');
    console.log('SUNNY cells: even (x+y) positions');
    console.log('RAIN cells: odd (x+y) positions');
    console.log('Move between cells to test transitions!');
    console.log('========================================');
  }

  public getWeatherGrid(): BiomeWeatherGrid {
    return this.weatherGrid;
  }

  /**
   * Reset all tracked players' transition state to settled at the given
   * weather, clearing any in-flight approach/cross so a global override
   * isn't fought by a stale transition target.
   */
  private resetPlayerStatesToWeather(weatherType: WeatherType): void {
    for (const playerState of this.playerWeatherStates.values()) {
      playerState.currentWeather = weatherType;
      playerState.targetWeather = null;
      playerState.targetNeighborCell = null;
      playerState.previousCell = null;
      playerState.transitionPhase = 'settled';
      playerState.transitionPercent = 0.0;
    }
  }

  public setAllCellsToWeatherType(weatherType: WeatherType): void {
    if (!this.weatherGrid) {
      console.error('Weather grid not initialized');
      return;
    }

    if (!WeatherHashes[weatherType]) {
      console.error(`Invalid weather type: ${weatherType}`);
      return;
    }

    const grid = this.weatherGrid.getGrid();
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x].weather = weatherType;
      }
    }
    this.weatherGrid.setGrid(grid);
    console.log(`All cells set to weather type: ${weatherType}`);
  }
}

const weatherManager = ClientWeatherManager.getInstance();

export default weatherManager;
