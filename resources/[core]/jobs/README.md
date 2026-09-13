# Jobs

`jobs` is a **framework**, not a job. It knows how to gate, meter, time and pay for work; it does
not know what any particular work *is*. A job resource (a sheriff department, a saloon, a stable)
declares its jobs and tasks to `jobs`, subscribes to the lifecycle it cares about, and implements
the actual gameplay itself.

If you want a worked example first, read [EXAMPLE_USAGE.md](./EXAMPLE_USAGE.md).

## Identity model

This is the part that has confused people, so it is stated first.

| Thing | Identified by | Created by | Lives in |
| --- | --- | --- | --- |
| Job | `jobHandle` — a string you choose, e.g. `'sheriff'` | your resource | socket-server memory |
| Task | `taskHandle` — a string you choose, e.g. `'patrol-valentine'` | your resource | socket-server memory |
| Task instance | `id` — an opaque string the socket server generates | `jobs` | socket-server memory |

Rules that follow from this:

- **Definitions are addressed by handle.** Every registration, permission, availability check and
  assignment call takes `jobHandle` and `taskHandle`. There is no numeric job id or task id
  anywhere in the API.
- **A live attempt at a task is addressed by instance id.** `startTask`, `updateTaskProgress`,
  `completeTask` and `failTask` take the `instanceId` returned by `assignTask` / `acceptTask`. You
  never construct one yourself.
- **Task permissions are keyed `jobHandle:taskHandle`.** Do not build that string by hand — call
  `taskPermissionId(jobHandle, taskHandle)`.
- **Every character-scoped call carries `characterId` and ownership is verified server-side.** A
  character cannot advance an instance that belongs to someone else, so an instance id leaking to
  the wrong client is not an exploit.

## Persistence

Job and task **definitions live in socket-server memory only**. They are declared by resource code,
not by a database row, which means:

> **Every resource that owns jobs must re-register them on every socket connection.**
> Register on the `socket.connected` event and once immediately if the socket is already up —
> see `resources/[tools]/research/src/server/stuff/police.ts`.

`socket.connected` is emitted by `resources/base/src/server/comms.ts` every time the game server
connects to the socket server, and `PVBase.socketConnected()` reports whether it is connected right
now. `resources/[core]/world/src/server/server.ts` is the established pattern:

```typescript
import { PVBase, PVJobs } from '@lib/server';

const registerJobAndTasks = async (): Promise<void> => {
  await PVJobs.registerJob(sheriffJob);
  await PVJobs.registerTask('sheriff', patrolTask);
};

on('socket.connected', registerJobAndTasks);

if (PVBase.socketConnected()) {
  void registerJobAndTasks();
}
```

`onResourceStart` for `jobs` is the wrong trigger: it fires when the FXServer resource starts, which
says nothing about the socket server. A socket server restarted under a running game server comes
back with an empty registry, and only a `socket.connected` subscription replays into it.

Task **instances** are memory-only too. They describe work in a world of zones, peds and blips that
does not survive a restart either, so persisting a pointer to something that is gone buys nothing.

What *does* reach the database (`socket/src/db/schema.ts`):

| Table | Holds |
| --- | --- |
| `JobEmployees` | Durable employment per `characterId` + `jobHandle`: position, salary, `totalHoursWorked`, `hiredAt`, `firedAt`. `clockedInAt` is written so a shift lost to a crash can be settled on boot; memory is the live authority. |
| `JobPermissions` | `JOB` and `TASK` grants. `typeId` is the job handle, or `jobHandle:taskHandle` for a task. |
| `JobTaskCooldowns` | Metering. Holds a `completions` array of epoch-ms stamps, pruned to the last 24h on write; every window (hour, day, burst) is *derived* from it at read time, so nothing has to reset a counter on a schedule. |
| `JobPaySlips` | The pay ledger. |

## Money

There is **no bank integration**. Nothing in this resource moves money into a character's account.

Payouts are written as rows in `JobPaySlips` and that is the whole story: a pay slip is an unredeemed
IOU with an `amount`, a `reason` and a `jobHandle`. `getPaySlips()` lists a character's unredeemed
slips and `redeemPaySlip(id)` marks one redeemed. What redemption *means* — a teller, a strongbox,
a bank resource that does not exist yet — is left to whoever builds it. The `payment` numbers on
`ClockResult`, `TaskResult` and the `onClockOut` / `onTaskCompleted` / `onPaySlipIssued` hooks are
the amounts written to slips, not balances credited anywhere.

The two halves are separate hooks, and the difference is the whole reason there are two:

| Hook | Fires when | Money |
| --- | --- | --- |
| `onPaySlipIssued` | A shift settled or a task completed and a slip was written | Nothing has moved |
| `onPayment` | A slip was redeemed | This is where money changes hands |

> **A bank integration subscribes to `onPayment` and nothing else.** Subscribing to both credits the
> same wages twice — once when they are earned, once when the slip is cashed.

## Where the code lives

Four tiers, following the standard layout described in the repo `CLAUDE.md`:

| Tier | Path | Responsibility |
| --- | --- | --- |
| Socket server | `socket/src/managers/jobs.ts` | All logic and all database access. Pure — it does not import the socket server and never emits. |
| Socket server | `socket/src/controllers/jobs.ts` | Socket wiring. Every emit happens here. |
| Game server | `resources/[core]/jobs/src/server/` | FXServer exports, and the hook registry that other resources subscribe to. |
| Game client | `resources/[core]/jobs/src/client/` | Player-facing exports, commands, notifications. |
| UI | `resources/ui/src/ui/app/controllers/jobs.ts`, `resources/ui/src/ui/app/layers/jobs/` | Socket.IO bridge and the jobs interface. |

Types are split the same way: `src/types.d.ts` (shared `Jobs.*`), `src/client/types.d.ts`,
`src/server/types.d.ts`, and `socket/src/types/jobs.d.ts`.

## Lifecycle

### Clocking

```
clockIn(characterId, jobHandle, location?)  ->  ClockResult
clockOut(characterId)                       ->  ClockResult { hoursWorked, payment }
```

Clock-in is gated by `JobDefinition.clockInConstraints` — an optional `location` (with a `radius`),
an optional `hours` window (real-world local hours, inclusive start, exclusive end, wrapping when
`start > end`) and an optional `daysOfWeek`.

A shift is closed when the character clocks out, when their socket disconnects, or — for a shift
that outlived a socket-server crash — on the next boot. Offline wall-clock time is never paid.

### Tasks

```
ASSIGNED ──startTask──▶ IN_PROGRESS ──completeTask──▶ (gone, metered, paid)
                    └──────────────────failTask────▶ (gone)
```

- `assignTask` (server side) creates an instance in `ASSIGNED` and leaves it for the character to
  begin. `acceptTask` (client side) is the one-step version: it creates the instance already
  `IN_PROGRESS`.
- `completeTask` only succeeds on an `IN_PROGRESS` instance owned by the calling character. This is
  what makes cooldowns real: a completion is what gets recorded in `JobTaskCooldowns`.
- `updateTaskProgress` merges an arbitrary `Record<string, unknown>` into the instance's `progress`.
  `jobs` never reads it; it is yours.

## Definitions

### `Jobs.JobDefinition`

```typescript
interface JobDefinition {
  handle: string;
  name: string;
  description?: string;
  paymentType: 'HOURLY' | 'PER_TASK' | 'COMMISSION' | 'SALARY' | 'CALLBACK';
  paymentAmount: string;
  requirements?: Record<string, unknown>;
  inventory?: Record<string, unknown>;
  clockInConstraints?: ClockInConstraints;
  metadata?: Record<string, unknown>;
}
```

`paymentAmount` is a string because it is a decimal column, not a float.

### `Jobs.TaskDefinition<TConfig>`

```typescript
interface TaskDefinition<TConfig = Record<string, unknown>> {
  handle: string;
  name: string;
  description?: string;
  taskType: string;
  config?: TConfig;
  requirements?: Record<string, unknown>;
  rewards?: { payment?: string; items?: Record<string, number> };
  timeConstraints?: { startHour?: number; endHour?: number; daysOfWeek?: number[] };
  repeatConfig?: RepeatConfig;
  metadata?: Record<string, unknown>;
}
```

`taskType` is a free-form category string and `config` is an opaque payload carried through
untouched — `jobs` never interprets either. That is deliberate: a task type is a thing your resource
knows how to run, not a thing the framework enumerates. Type the pair together with `satisfies`:

```typescript
const patrolTask = {
  handle: 'patrol-valentine',
  name: 'Patrol Valentine',
  taskType: 'patrol',
  config: { zone: 'research_zone_valentine_0' },
} satisfies Jobs.TaskDefinition<Jobs.PatrolConfig>;
```

`Jobs.PatrolConfig` (`{ zone }`) and `Jobs.EscortConfig` (`{ startLocation, endLocation }`) are
convenience shapes for the two types the core ships with. Your own task types bring their own
config interface.

`rewards.payment` is the field that actually pays — it overrides the job's `paymentAmount` for a
`PER_TASK` payout. A reward field by any other name is ignored.

> **`rewards.payment` only pays on a `PER_TASK` job.** Completion reads it solely when the job's
> `paymentType` is `PER_TASK`; on `HOURLY`, `SALARY`, `COMMISSION` or `CALLBACK` it is dead weight
> and the task pays nothing, silently. `HOURLY` pays for time on the clock at clock-out and for
> nothing else; `SALARY`, `COMMISSION` and `CALLBACK` write no slip of their own at all. A task
> meant to pay per completion therefore belongs to a `PER_TASK` job —
> see `resources/[tools]/research/src/server/stuff/police.ts`, where the sheriff job is `PER_TASK`
> and `paymentAmount` is the payout for a task that declares no reward of its own.

### `Jobs.RepeatConfig`

A discriminated union, so each variant carries only the fields its branch reads:

```typescript
{ type: 'UNLIMITED' }
{ type: 'COOLDOWN'; cooldownMinutes: number; maxPerDay?: number }
{ type: 'BURST'; burstSize: number; burstCooldownMinutes: number; maxPerHour?: number }
{ type: 'WINDOW'; maxPerWindow: number; windowMinutes: number; maxPerDay?: number }
```

`canStartTask` reports the verdict as `Jobs.TaskAvailability`:

```typescript
{ canStart: boolean; reason?: string; nextAvailableAt?: number; remainingCooldown?: number }
```

Timestamps in this API are epoch milliseconds throughout — `Date` does not survive JSON transport.

## Hooks

Hooks are the main seam for a job resource. A resource that registers nothing pays nothing: the
socket server emits one envelope event to the game server and `jobs` fans it out only to whoever
subscribed.

```typescript
registerJobHook<TType extends Jobs.HookType>(
  id: string,
  type: TType,
  jobHandle: string,
  fn: Jobs.Hook<TType>,
): () => void;
```

The shape — an id, a type, a subject, and an unregister closure returned — is the same one the doors
resource uses (`resources/[core]/doors/src/client/misc/hooks.ts`, exported as `onDoorHook` in
`resources/[core]/doors/src/client/exports.ts`). One difference matters:

> **Jobs hooks are notification-only. A hook cannot veto.**

There is no `return false` to cancel. The socket server does not block on the game server, so by the
time your hook runs the thing it is telling you about has already happened. Gate up front instead —
with permissions, `requirements`, `clockInConstraints` or `timeConstraints`.

Available types and their payloads (`Jobs.HookPayloads`):

| Type | Payload |
| --- | --- |
| `onClockIn` | `{ characterId, jobHandle }` |
| `onClockOut` | `{ characterId, jobHandle, hoursWorked, payment }` |
| `onTaskAssigned` | `{ characterId, instance }` |
| `onTaskStarted` | `{ characterId, instance }` |
| `onTaskProgress` | `{ characterId, instance }` |
| `onTaskCompleted` | `{ characterId, instance, payment }` |
| `onTaskFailed` | `{ characterId, instance, reason }` |
| `onPaySlipIssued` | `{ characterId, jobHandle, amount, reason }` — wages earned, slip written, no money moved |
| `onPayment` | `{ characterId, jobHandle, amount, reason }` — slip redeemed, money changed hands |

The payload type is inferred from the `type` argument, so `fn` is typed without a cast.

`onPaySlipIssued` and `onPayment` carry the same payload shape and describe two different moments:
a paper slip being written, and that slip being cashed. Anything that credits a balance belongs on
`onPayment` alone; `onPaySlipIssued` is for the things that care about work being *earned* — a
notification, a shift log, a quota.

## Permissions

Grants are durable rows in `JobPermissions`: a `type` (`'JOB'` or `'TASK'`), a `typeId` (the job
handle, or `taskPermissionId(jobHandle, taskHandle)` for a task) and a `characterId`. Clock-in
checks the `JOB` grant, task availability and task start check the `TASK` grant.

> **Permissions are open by default.** The check in `socket/src/managers/jobs.ts` returns **true**
> when *no character at all* holds an un-revoked grant for that `typeId`. A job or task nobody has
> been granted is open to everyone; the first grant is what closes it, and from then on only the
> holders pass.

Two consequences worth having in mind before you build a roster on top of this:

- A job is unrestricted until somebody is hired into it. That is deliberate — a job with no roster
  is playable — but it means "nobody has permission" and "everybody has permission" are the same
  state.
- Revoking the **last** outstanding grant for a `typeId` does not lock the job down; it reopens it.
  Revocation is not a deny list. See EXAMPLE_USAGE.md §4 for what that means for firing.

## Server exports

From `@lib/server`, as `PVJobs`.

| Export | Signature |
| --- | --- |
| `registerJob` | `(jobData: Jobs.JobDefinition) => Promise<boolean>` |
| `registerTask` | `(jobHandle: string, taskData: Jobs.TaskDefinition) => Promise<boolean>` |
| `registerJobHook` | `(id, type, jobHandle, fn) => () => void` |
| `grantPermission` | `(characterId, type: 'JOB' \| 'TASK', typeId, grantedBy) => Promise<boolean>` |
| `revokePermission` | `(characterId, type: 'JOB' \| 'TASK', typeId) => Promise<boolean>` |
| `taskPermissionId` | `(jobHandle, taskHandle) => string` |
| `assignTask` | `(characterId, jobHandle, taskHandle) => Promise<Jobs.TaskInstance \| null>` |
| `completeTask` | `(characterId, instanceId) => Promise<Jobs.TaskResult>` |
| `failTask` | `(characterId, instanceId, reason?) => Promise<boolean>` |
| `getActiveTasks` | `(characterId) => Promise<Jobs.TaskInstance[]>` |
| `isCharacterClockedIn` | `(characterId) => boolean` |
| `getCharacterJob` | `(characterId) => string \| null` — the job handle, not the definition |

## Client exports

From `@lib/client`, as `PVJobs`. All of these act on the local player.

| Export | Signature |
| --- | --- |
| `clockIn` | `(jobHandle: string) => Promise<Jobs.ClockResult>` — coordinates are read locally |
| `clockOut` | `() => Promise<Jobs.ClockResult>` |
| `getCurrentJob` | `() => Jobs.JobDefinition \| null` — cached, synchronous |
| `isCurrentlyClocked` | `() => boolean` — cached, synchronous |
| `refreshState` | `() => Promise<void>` |
| `getAvailableTasks` | `(jobHandle?: string) => Promise<Jobs.TaskDefinition[]>` |
| `canStartTask` | `(jobHandle: string, taskHandle: string) => Promise<Jobs.TaskAvailability>` |
| `acceptTask` | `(jobHandle, taskHandle) => Promise<Jobs.TaskInstance \| null>` |
| `startTask` | `(instanceId: string) => Promise<Jobs.TaskInstance \| null>` |
| `updateTaskProgress` | `(instanceId, progress: Record<string, unknown>) => Promise<Jobs.TaskInstance \| null>` |
| `completeTask` | `(instanceId: string) => Promise<Jobs.TaskResult>` |
| `failTask` | `(instanceId: string, reason?: string) => Promise<boolean>` |
| `getActiveTasks` | `() => Promise<Jobs.TaskInstance[]>` |
| `getPaySlips` | `() => Promise<Jobs.PaySlip[]>` |
| `redeemPaySlip` | `(paySlipId: number) => Promise<boolean>` |

## Events

Only one event crosses into the game **server**, and `jobs` owns it:
`jobs.hook(type, jobHandle, payload)`. Subscribe with `registerJobHook` rather than listening for it
yourself — the envelope is an implementation detail of the fan-out.

The game **client** receives these from the socket server through the UI bridge
(`ClientIn.FromSocket` in `src/client/types.d.ts`), and `jobs` turns them into notifications and
state refreshes:

`jobs.clock-in-update`, `jobs.clock-out-update`, `jobs.task-assigned`, `jobs.task-started`,
`jobs.task-progress`, `jobs.task-completed`, `jobs.task-failed`, `jobs.payment-processed`.

None of these is a broadcast. Job, wage and pay slip data is per-character, so
`socket/src/controllers/jobs.ts` sends each event to that one player's UI socket — the requesting
socket, or the one looked up by character id when the game server drove the change. A player never
receives another player's wages, and an event for a player who has already disconnected is dropped.
Each event still carries its `characterId` as the first argument, because the payload has to name
the character it describes, not because you are expected to filter.

## Commands

Shipped by the client resource (`src/client/commands.ts`), useful for testing:

- `/clockin <job_handle>`
- `/clockout`
- `/jobs` — lists the tasks currently available to you
- `/jobstatus`

## Adding a feature

1. Logic and database work go in `socket/src/managers/jobs.ts`. The manager stays pure — no socket
   imports, no emits.
2. Wiring and emits go in `socket/src/controllers/jobs.ts`.
3. Type the new call on both sides: `socket/src/types/jobs.d.ts` for the socket surface,
   `src/client/types.d.ts` / `src/server/types.d.ts` for the exports.
4. Only then add the export or the UI.

Log with `logInfoS` for anything game-server-facing and `logInfoC` for anything client-facing, both
from `socket/src/helpers` — the same convention as the other controllers.
