# GET_EVENT_DATA cannot be called from JS in this runtime

> **Status: resolved.** See "Resolution" at the bottom - kept for reference since
> the underlying RedM/JS ABI constraint is easy to forget and could resurface
> for any other native needing a mutable output buffer.

## Symptom

In-game script error when `EventPoller.tick()` runs:

```
SCRIPT ERROR in ticker: Error: native 57ec5fa4d4d6afca: __data field does not contain a number
> EventPoller.decode (@events/build/client.js:11432)
> EventPoller.tick (@events/build/client.js:11492)
> Object.callback (@events/build/client.js:15574)
```

`0x57EC5FA4D4D6AFCA` is `GET_EVENT_DATA(eventGroup, eventIndex, buffer, bufferSize)` — it fills a
caller-provided output buffer with the event's raw int32 fields. `EventPoller.decode()`
(`resources/[core]/events/src/client/managers/event-poller.ts`) calls it like this:

```ts
const buffer = new ArrayBuffer(size);
const view = new DataView(buffer);
Citizen.invokeNative(GET_EVENT_DATA, group, index, buffer, def.size, Citizen.returnResultAnyway());
```

This throws at runtime instead of filling `buffer`.

## Root cause

RedM/FiveM's JS (`@citizenfx/client`) native-calling ABI does not have an argument type that
represents a mutable, variable-size output buffer. The complete set of special argument types
exposed to JS (`node_modules/@citizenfx/client/index.d.ts`) is:

```ts
type InputArgument =
  string | number |
  IntPtrInitialized | FloatPtrInitialized | IntPtr | FloatPtr | VectorPtr |
  ReturnResultAnyway | ResultAsInteger | ResultAsFloat | ResultAsString |
  ResultAsVector | ResultAsLong | ResultAsObject;
```

`IntPtr`/`FloatPtr`/`VectorPtr` are single-value output pointers (used for natives that return one
extra int/float/vector by reference) — not a bulk N-field struct buffer. There is no
`ArrayBuffer`/`DataView`/`Uint8Array`-based marshaling path for natives like `GET_EVENT_DATA` that
need "fill this N*4-byte buffer" semantics. Passing a raw `ArrayBuffer`/`DataView` gets interpreted
by the native argument marshaler as some other expected shape, hence "`__data` field does not
contain a number" — it's trying to read the buffer as if it were one of the above sentinel/ref
argument objects, not as a byte buffer.

By contrast, **Lua's binding does support this** — the retired `events_manager` resource's
`client/dateview.lua` worked by allocating a Lua string (a byte blob) via `string.rep('\0', n)` and
passing that string directly as the buffer argument; Lua's FFI-style native binding treats strings
as mutable byte buffers for this purpose. That's why the original Lua implementation worked for
years, and why the direct JS port does not.

## Consequence for this migration

The JS-side `EventPoller.decode()` in the new `[core]/events` resource cannot currently call
`GET_EVENT_DATA` at all. This affects:

- `EventPoller.register/unregister/once/awaitEvent` — the raw-game-event polling API. Broken.
- The 8 previously-hardcoded `observedEvents` triggers in the old `events` resource
  (`entityDamaged`, `loot`, etc.) — these were **already broken before this migration** too, via
  the same bug in the old `event-listener.ts` (it made the identical native call with a raw
  `DataView`). This was not noticed because a repo-wide grep found zero consumers of those
  triggers before we started (see `PLAN-EVENTS.md` §1.2).
- Not affected: the derived player-state cache (`PlayerStateManager`), key-mapping, and
  cron/time scheduling — none of those call `GET_EVENT_DATA`.

## Options to research

1. **Lua decode helper.** Keep a minimal Lua client script (in this resource or a tiny separate
   one) whose only job is calling `GET_EVENT_DATA` with a Lua string buffer (proven working
   pattern from the old `dateview.lua`) and exposing the decoded `number[]` via `exports`, called
   from `EventPoller.decode()`. This reintroduces a small Lua/TS split but is the
   known-to-work path.
2. **Alternative JS marshaling.** Investigate whether newer `@citizenfx/client` versions, or an
   undocumented native-calling convention (e.g. passing a `Buffer`/`Uint8Array` instead of
   `ArrayBuffer`/`DataView`, or a different combination of `Citizen.resultAsObject()` /
   multiple discrete `pointerValueInt()` args per field) can represent this call purely in JS.
   Unconfirmed whether this is possible at all given the `InputArgument` union has no bulk-buffer
   type.
3. **Skip GET_EVENT_DATA, use per-field natives if any exist.** Some events may have dedicated
   natives that return individual fields (e.g. entity/ped involved) without needing the raw event
   queue struct at all — worth checking case by case for the small set of events real consumers
   actually care about, avoiding the generic struct-buffer problem entirely.

## Resolution

Went with option 1. `client/event-data.lua` is a small Lua client script (loaded before
`build/client.js` in `fxmanifest.lua`) that allocates a Lua string blob, calls `GET_EVENT_DATA`
with it (the same technique `dateview.lua` used), unpacks every int32 field with `string.unpack`,
and exposes the result as a plain 0-indexed array via `exports('decodeEvent', ...)`.

`EventPoller.decode()` (`src/client/managers/event-poller.ts`) calls this export instead of
invoking the native directly. Fields marked as float in `catalog.ts` are reinterpreted from the
returned int32 bits on the TS side (via a small scratch `DataView`), so the Lua helper only ever
deals in `<i4` (little-endian int32) reads — no float-specific Lua code needed.

## Second issue found after the Lua fix: EVENT_NETWORK_LASSO_ATTACH had the wrong `size`

After the Lua bridge was in place, `EVENT_NETWORK_LASSO_ATTACH` (group 1) still failed to decode —
`GetNumberOfEvents(1)`/`GetEventAtIndex(1, i)` correctly enumerate it (right hash, right index),
but `GET_EVENT_DATA(1, i, buffer, size)` returned failure with the catalog's `size = 2`.

This briefly looked like "GET_EVENT_DATA only works for group 0" — a `EVENT_ENTITY_DAMAGED`
(group 0) control succeeded in the same session while the lasso event (group 1) failed, and
several other things were ruled out along the way (JS↔Lua export timing, two pollers draining the
same queue concurrently, wrong hash resolution, wrong buffer-size *units*). All of those checks
were real and are still valid data points — but the actual root cause was simpler and specific to
this one event: **`GET_EVENT_DATA` rejects the read entirely if `size` doesn't exactly match the
event's real field count**, for any group. A debug sweep of `size` from 1 to 20 against the same
live lasso-attach event found it decodes successfully at `size = 3`, not the `size = 2` the catalog
had. `EVENT_NETWORK_DAMAGE_ENTITY` (group 1, `size = 32`) was independently observed decoding
correctly with real data in the same test session, confirming group 1 works fine in general.

Conclusion: there is no group 1-3 limitation. `catalog.ts`'s `size` values must be exact per-event
field counts; a wrong size makes `GET_EVENT_DATA` fail closed rather than partially succeed or
truncate, which can look exactly like "this group/native doesn't work" if you only test one event.
`EVENT_NETWORK_LASSO_ATTACH` has been corrected to `size = 3` (see `catalog.ts`); its field
semantics beyond `victim`/`attacker` at indices 0/2 are unconfirmed (index 1 unlabeled), and any
other group 1-3 sizes carried over from the reference doc should be treated as unverified until
live-tested the same way, rather than assumed correct or assumed broken.
