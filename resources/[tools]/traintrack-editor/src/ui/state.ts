import { type Track, keyOf } from './model/track';
import type { Selection } from './model/track-store';
import type { TranslationSnap } from './scene/gizmo';

export interface UiState {
  show: boolean;
  tracks: readonly Track[];
  /** Track being edited. Always rendered, whatever the visibility set says. */
  selectedTrackKey: string | null;
  /** Tracks drawn as dim context alongside the selected one. */
  visibleTracks: Set<string>;
  /** Substring filter for the track list. */
  trackFilter: string;
  /** The node or handle the gizmo is on. */
  selection: Selection | null;
  /** World point under the cursor, from the client's shape test. */
  cursor: Vector3Format | null;
  /** Reflect the opposite handle when dragging one, keeping the curve smooth. */
  mirrorHandles: boolean;
  translationSnap: TranslationSnap;
  /** trackKey#index of junction nodes whose partner is missing. */
  broken: ReadonlySet<string>;
  /** trackKey#index of junction nodes naming their own track. Legal. */
  selfReferencing: ReadonlySet<string>;
  /** Per-node arc-minus-stored length for the selected track. */
  lengthDeltas: (number | null)[];
  undoLabel: string | null;
  exportOpen: boolean;
  /** Problems reported by the client while loading, shown once on open. */
  loadFailures: string[];
  /**
   * Bumped on every geometry change. Lets a panel tell "the model moved" from
   * "something else re-rendered" without deep-comparing hundreds of nodes.
   */
  revision: number;
}

export function createInitialState(): UiState {
  return {
    show: false,
    tracks: [],
    selectedTrackKey: null,
    visibleTracks: new Set(),
    trackFilter: '',
    selection: null,
    cursor: null,
    mirrorHandles: true,
    translationSnap: 0.05,
    broken: new Set(),
    selfReferencing: new Set(),
    lengthDeltas: [],
    undoLabel: null,
    exportOpen: false,
    loadFailures: [],
    revision: 0,
  };
}

export function selectedTrack(state: UiState): Track | null {
  if (!state.selectedTrackKey) return null;
  return state.tracks.find((t) => keyOf(t) === state.selectedTrackKey) ?? null;
}

export function selectionLabel(state: UiState): string {
  if (!state.selection) return state.selectedTrackKey ? 'No node selected' : 'No track selected';
  const { nodeIndex, part } = state.selection;
  if (part === 'node') return `Node ${nodeIndex}`;
  return `Node ${nodeIndex} ${part === 'handleIn' ? 'handle in' : 'handle out'}`;
}
