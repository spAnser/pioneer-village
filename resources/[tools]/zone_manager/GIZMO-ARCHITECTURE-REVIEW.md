# Gizmo Architecture — Critical Review

Status as of this writing: the point-editing gizmo works (drag moves the correct
point, in the correct direction, and the fix for the marker-thread-death bug is
in place). This document is not about correctness bugs — it's about whether the
current architecture is the right one to keep building on. It isn't. This is the
case for why, written down so the reasoning survives past this conversation.

## Summary

The Three.js layer was introduced to render an interactive 3D gizmo. Over the
course of debugging alignment issues, every *other* visual element that
originally went through Three.js (point markers, index labels, the "next
point" cursor indicator) was migrated off it onto native RDR3 calls
(`GetScreenCoordFromWorldCoord`) because Three.js's camera projection could not
be made to match RDR3's precisely enough to trust. The gizmo's drag handles are
now the *only* thing still using the Three.js/TransformControls path.

That's a full 3D rendering engine, a per-frame camera sync, and a fragile
pointer-events proximity hack — all in service of three colored drag arrows —
sitting on top of a coordinate mapping that was already proven untrustworthy
for every other use in this same tool.

## Findings

### 1. Three.js is now solving almost nothing, at real ongoing cost

- ~600KB third-party dependency (`three.min.js` + `transformControls.js`),
  loaded from a CDN.
- A full `THREE.Scene`/`THREE.PerspectiveCamera`/`THREE.WebGLRenderer` synced
  every frame to the RDR3 camera (position, rotation, FOV).
- All of this exists solely to host `TransformControls` for one widget. Every
  other visual (markers, labels, cursor indicator) was moved to
  `GetScreenCoordFromWorldCoord` specifically *because* the Three.js path
  couldn't be trusted — see `gizmo.js`'s own comments documenting this
  history.

**Implication:** the dependency and runtime cost of a 3D engine is being paid
in full, while the tool has already demonstrated, empirically, that its output
can't be relied on without a parallel ground-truth system running alongside it.

### 2. The unverified projection is now load-bearing for interaction, not just visuals

Visual alignment was accepted as "not pixel perfect but good enough" — a
reasonable bar for *seeing* where a point is. But the gizmo's drag axes, its
mesh-based hit testing, and its on-screen handle positions all depend on that
exact same imprecise Three.js projection.

**What's unverified:** whether grabbing what looks like the Z-axis handle
actually drags cleanly along true world Z, especially at oblique camera
angles, or whether the axis a user visually identifies is subtly rotated from
the axis that's actually being dragged. We've confirmed dragging moves the
*correct point* in *roughly* the right direction — we have not verified
per-axis drag accuracy under the same distortion that was visible in the
marker alignment testing.

**Implication:** the one feature where projection accuracy actually matters
for *correctness* (not just visual polish) is the one feature still standing
on the unverified path.

### 3. The pointer-events proximity mechanism is a fragile patch, not a design

Background: a WebGL `<canvas>` captures pointer events across its entire
bounding box (the full screen here) regardless of what's visually drawn at a
given pixel. Setting `pointer-events: auto` whenever a gizmo was attached (which
is almost always, since one attaches to whichever point is nearest) silently
broke point placement everywhere on screen — a real bug that shipped and had
to be diagnosed after the fact.

The fix (`updateCursorProximity` in `gizmo.js`) enables canvas click-through
only when the cursor is within a hardcoded 60px radius of the gizmo's
2D screen position (itself computed via the native path, not Three.js). This
works, but:

- It's held together by a magic pixel constant with no derivation.
- It depends on careful event ordering between `mousemove`, `mousedown`, and
  Vue's reactivity — order-of-operations bugs in this area are easy to
  reintroduce.
- It's the second time a Three.js-canvas-vs-native-input conflict has caused a
  real, user-visible break (the first being the original click-swallowing
  bug). That's a pattern, not a one-off.

### 4. Two independent coordinate/rendering systems must be kept in sync indefinitely

Points are now drawn/tracked through *two* parallel systems:

- **Native path:** `GetScreenCoordFromWorldCoord` → 2D screen-space divs
  (markers, labels, cursor indicator, hover highlighting).
- **Three.js path:** camera-synced 3D scene → anchor mesh → gizmo.

Every future change to how points are displayed or interacted with has to
consider which path it affects, whether the two need to agree, and whether a
change to one silently desyncs the other. This already caused two real,
shipped bugs during development:

- The `DrawWorldLabel`/`DrawMarkerSphere` thread-death bug: an uncaught
  native error inside one draw thread permanently stops that thread in
  FiveM/RedM — a footgun independent of Three.js, but one whose blast radius
  was made worse by having multiple parallel systems that needed defensive
  isolation from each other.
- The `set_point_position` nil-coordinate bug: a bad value crossing from the
  Three.js/JS side into the native draw thread silently killed marker
  rendering for every point, while the (separately-sourced) panel list and
  cyan dot kept working — because they don't share a code path with the
  Three.js-derived drag data. The inconsistency between "this indicator still
  works" and "that one doesn't" made the bug harder to diagnose than it
  needed to be, specifically because of the dual-system split.

## Recommendation

**Drop Three.js and `TransformControls` entirely.** Build the axis-drag gizmo
the same way every other visual element in this tool ended up working, by
necessity:

- Compute each axis handle's screen-space endpoint via
  `GetScreenCoordFromWorldCoord` (short lines from the point along world
  X/Y/Z), similar to how the existing zone debug-wall drawing already
  projects world geometry to screen.
- Hit-test by 2D distance from the mouse cursor to each handle's screen-space
  line/endpoint — no mesh raycasting, no WebGL canvas, no pointer-events
  layering problem to solve, since there's no second click-capturing surface
  at all.
- Drive the actual position delta with straightforward vector math along the
  chosen world-space axis, scaled by mouse movement — this is a well-understood
  problem (translate-along-axis-from-screen-delta) that doesn't need a 3D
  engine to solve for a single point.

This is a rewrite of the gizmo specifically, not a tweak. It removes an entire
rendering pipeline, removes the projection-accuracy question from the
interaction-critical path (moving it to the same "good enough, native-sourced"
bar already accepted for markers), and eliminates the two-systems-in-sync
maintenance burden going forward. The cost is: hand-rolled 2D hit-testing and
axis math instead of a battle-tested library doing it — a reasonable trade
given the library's core value proposition (accurate 3D projection matching
the host camera) is exactly what couldn't be made to work here.

## Non-goals of this document

This is not a claim that the current implementation is broken today. It
works. This is a judgment that the foundation it's built on (Three.js/RDR3
camera parity) was already shown not to hold up under scrutiny, and that
continuing to build interactive features on that foundation — rather than on
the native path that every other part of this tool converged on — is
accumulating risk and complexity that a rewrite would remove.
