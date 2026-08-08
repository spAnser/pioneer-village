export type Mode = 'placing' | 'selected' | 'dragging';
export type DragMode = ZoneManagerNew.Axis | 'plane';

export interface UiState {
  show: boolean;
  points: ZoneManagerNew.Point[];
  minZ: number;
  maxZ: number;
  cursor: ZoneManagerNew.Point | null;
  selectedIndex: number | null;
  panelOpen: boolean;
  hoveredIndex: number | null;
  pointScreens: ZoneManagerNew.PointScreenEntry[];
  selectedGizmo: ZoneManagerNew.GizmoScreenPositions | null;
  draggingAxis: DragMode | null;
  exportData: ZoneManagerNew.ExportResult | null;
  boundsSectionExpanded: boolean;
  exportSectionExpanded: boolean;
  snapToGround: boolean;
  // Just-placed-point nudge stepper: index of the point it targets, cleared
  // whenever the cursor moves to aim the next placement or on explicit dismiss.
  nudgeIndex: number | null;
}

export function createInitialState(): UiState {
  return {
    show: false,
    points: [],
    minZ: -50,
    maxZ: 999,
    cursor: null,
    selectedIndex: null,
    panelOpen: false,
    hoveredIndex: null,
    pointScreens: [],
    selectedGizmo: null,
    draggingAxis: null,
    exportData: null,
    boundsSectionExpanded: false,
    exportSectionExpanded: true,
    snapToGround: false,
    nudgeIndex: null,
  };
}

export function modeOf(state: UiState): Mode {
  if (state.draggingAxis) return 'dragging';
  if (state.selectedIndex !== null) return 'selected';
  return 'placing';
}

export function modeLabel(state: UiState): string {
  switch (modeOf(state)) {
    case 'dragging':
      return state.draggingAxis === 'plane' ? 'Dragging X/Y plane' : `Dragging ${state.draggingAxis!.toUpperCase()} axis`;
    case 'selected':
      return `Point ${state.selectedIndex} selected`;
    default:
      return 'Placing';
  }
}
