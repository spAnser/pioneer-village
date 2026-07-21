# zone_manager

## Usage

Run `/zone_manager` in-game to open the tool. A free-fly camera takes
over (WASD to move, Q/E for up/down, Shift to sprint, right/middle-click-drag
to look around).

- **Place a point**: click or press `F` while aiming at world geometry. A
  cursor readout in the top status strip shows the coordinate under the
  cursor before you commit, or "Target out of range" if the raycast doesn't
  hit anything.
- **Select a point**: click its marker in the world, or its row in the panel
  (`Tab` to open). Selection is explicit and persists — it does not follow
  the nearest point to your cursor.
- **Edit a selected point**: drag one of the 3 colored axis handles (X/Y/Z)
  to move along that world axis, or the flat square between the X/Y arms to
  move freely across the ground plane. Colors brighten on hover/drag to
  confirm you're on the right handle. Alternatively, type exact X/Y/Z values
  directly into the panel's Selected Point fields.
- **Undo / Clear**: icon buttons in the status strip.
- **Bounds**: Min/Max Z in the panel, seeded from your position when the
  tool opens. This — not any individual point's Z — controls the floor/
  ceiling of the green preview wall (see Architecture notes below).
- **Export**: generates TS and Lua array text once at least 3 points exist.

## Architecture

### Client (`src/client/`)

- `client.ts` — entry point. Registers the `/zone_manager` command, all
  NUI callbacks, and two throttled per-frame feeds to the NUI: a cursor
  raycast feed (~20Hz) and a screen-projection feed (~30Hz) for point
  markers and the selected point's gizmo.
- `camera.ts` — `FreeCamera` class. Free-fly movement and look are both
  driven by a single per-frame `setTick` loop (not per-NUI-event), which is
  what keeps rotation as smooth as movement — see inline comments for why an
  earlier per-mousemove-call approach caused visible stutter. Camera
  creation is deliberately spread across frame boundaries (`nextFrame`)
  rather than run synchronously, matching how the old Lua tool's
  `Citizen.CreateThread` implicitly yielded between native calls.
- `raycast.ts` — pure screen↔world math ported from the old tool's Lua.
  `worldToScreen`/`worldToScreenRaw` are deliberately separate: the raw
  version is used internally by `screenToWorld`'s calibration division,
  because rounding those intermediate values (for on-screen display
  stability) corrupts the raycast direction, especially at long range.
- `markers.ts` — native in-world point/cursor markers (`DrawMarker`), each
  on its own persistent `setTick` thread so an uncaught error in one can't
  kill the others. No native text-drawing — RDR3 doesn't support the
  classic GTA5 text-command API those natives belong to.
- `point-store.ts` / `zone-preview.ts` — point CRUD and the live `zones`
  resource `AddPoly` preview, rebuilt on every mutation.
- `screen-smoother.ts` — hysteresis smoothing for marker/gizmo screen
  positions, to suppress sub-pixel camera projection noise without the
  boundary-flicker a fixed-grid rounding approach has.
- `nui-bridge.ts` — typed wrappers around `SendNuiMessage`/
  `RegisterNuiCallbackType`.

### NUI (`src/ui/`)

Plain TypeScript, no framework — small classes with a `render(state)`
method doing targeted DOM updates, not a virtual DOM. `App` (`app.ts`) owns
all UI state and wires NUI messages/DOM input events to it. High-frequency
messages (`cursor_updated`, `frame_updated`) use narrow update paths that
only re-render the specific components reading that data, not a global
re-render — see comments in `app.ts` for why this mattered for perceived
lag during gizmo drags.

- `components/status-strip.ts` — always-visible top-center strip: point
  count, mode, Undo/Clear, and the cursor-position readout as a second row
  in the same element (true DOM parent/child, not a second independently
  positioned box, so the two rows can't visually drift apart).
- `components/hud.ts` — the post-placement nudge stepper (small +/-
  buttons per axis for sub-drag precision right after placing a point).
- `components/point-markers.ts` — 2D screen-positioned point markers,
  click-to-select.
- `components/gizmo-overlay.ts` — the 3 axis handles plus the flat
  plane-drag square. All hit-testing is 2D screen-space against native
  projected positions — no canvas, no WebGL, no mesh raycasting. The plane
  square is a true perspective-skewed SVG polygon bound to the actual
  projected X/Y leg directions (not an axis-aligned box), and is itself the
  hit target (`pointer-events: auto` on the polygon) so the clickable area
  never drifts from the visible shape at oblique camera angles.
- `components/side-panel.ts` + `components/sections/*` — the `Tab`-summoned
  panel (Selected Point, Points list, Bounds, Export), left peeking as a
  narrow clickable sliver when closed rather than fully off-screen.

### Build

Standard rspack/lerna setup matching other TS resources in this repo:
`rspack.config.js` exports `clientUI` from the shared `rspack/rspack.options`
config. `yarn build` / `yarn watch` from this directory, or via the repo
root's `lerna run build`.

## Known limitations

- A point's individual Z only affects the exported data, not the rendered
  green preview — `zones`' `AddPoly` takes one shared Min/Max Z for the
  whole polygon, not a per-vertex height. The UI surfaces this directly next
  to the relevant fields rather than leaving it as a silent surprise.
