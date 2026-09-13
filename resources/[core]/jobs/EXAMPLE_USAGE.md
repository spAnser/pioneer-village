# Jobs — usage examples

Worked examples for a resource that wants to own a job. Read [README.md](./README.md) first for the
identity model and the hook contract; this document is the practical companion.

Every example below is drawn from code in this repository. The source is named above each one.

## 1. Declaring a job and its tasks

Source: `resources/[tools]/research/src/server/stuff/police.ts`.

Definitions live in socket-server memory and are never persisted, so the owning resource declares
them on every socket connection. The trigger is `socket.connected`, emitted by
`resources/base/src/server/comms.ts` each time the game server connects, plus one immediate call
guarded by `PVBase.socketConnected()` for the case where the socket is already up — the same guard
`resources/[core]/world/src/server/server.ts` uses to register its cron events.

```typescript
import { PVBase, PVJobs } from '@lib/server';

// PER_TASK is what makes a task's rewards.payment reachable; paymentAmount is the payout for a
// task that declares no reward of its own.
const sheriffJob = {
  handle: 'sheriff',
  name: 'Sheriff Department',
  description: 'Maintain law and order in the town',
  paymentType: 'PER_TASK',
  paymentAmount: '10.00',
  requirements: { badge: true },
  clockInConstraints: {
    location: { x: -277.345, y: 805.225, z: 119.2, radius: 10 },
    hours: { start: 6, end: 22 },
  },
  metadata: { department: 'law_enforcement' },
} satisfies Jobs.JobDefinition;

const patrolTask = {
  handle: 'patrol-valentine',
  name: 'Patrol Valentine',
  description: 'Walk patrol around the Valentine area',
  taskType: 'patrol',
  config: { zone: 'research_zone_valentine_0' },
  requirements: { badge: true },
  timeConstraints: {
    startHour: 8,
    endHour: 20,
  },
  repeatConfig: {
    type: 'COOLDOWN',
    cooldownMinutes: 30,
    maxPerDay: 8,
  },
} satisfies Jobs.TaskDefinition<Jobs.PatrolConfig>;

const escortTask = {
  handle: 'escort-valentine-prisoner',
  name: 'Escort Prisoner',
  description: 'Prison escort',
  taskType: 'escort',
  config: {
    startLocation: { x: -277.3, y: 805.2, z: 119.2 },
    endLocation: { x: 1372.6, y: -1301.9, z: 77.5 },
  },
  requirements: { badge: true },
  // Worth more than a patrol, so it overrides the job's per-task amount.
  rewards: { payment: '25.00' },
  repeatConfig: {
    type: 'COOLDOWN',
    cooldownMinutes: 30,
    maxPerDay: 8,
  },
} satisfies Jobs.TaskDefinition<Jobs.EscortConfig>;

// The job has to land before its tasks — a task for an unregistered job is rejected.
const registerJobAndTasks = async (): Promise<void> => {
  await PVJobs.registerJob(sheriffJob);
  await PVJobs.registerTask('sheriff', patrolTask);
  await PVJobs.registerTask('sheriff', escortTask);
};

on('socket.connected', registerJobAndTasks);

if (PVBase.socketConnected()) {
  void registerJobAndTasks();
}
```

Notes:

- **`onResourceStart` for `jobs` is not a substitute.** It reports that the FXServer resource
  started, which says nothing about the socket server the definitions actually live in. Restart the
  socket server under a running game server and a resource wired that way never re-registers.
- `satisfies` rather than a type annotation keeps the literal types (`'PER_TASK'`, `'COOLDOWN'`)
  intact while still checking the shape.
- `Jobs.TaskDefinition<Jobs.PatrolConfig>` types `config` for the reader of the task without teaching
  `jobs` anything about patrols. Your own task types supply their own config interface.
- `rewards.payment` is a decimal string, and it pays **only on a `PER_TASK` job** — completion reads
  it nowhere else. On an `HOURLY` job it is dead weight, because the wage comes from time on the
  clock at clock-out; on `SALARY`, `COMMISSION` and `CALLBACK` the framework writes no slip of its
  own at all. Anything else in `rewards` other than `items` is ignored.
- There is no `unregisterTask`. A definition, once registered, stands for the socket server's
  lifetime — so do not generate one definition per world object. See §5.

## 2. A task type with its own config

`taskType` is free-form. Declare the payload interface next to the resource that reads it and pass it
as the type argument.

```typescript
interface DeliveryConfig {
  pickup: Vector3Format;
  dropoff: Vector3Format;
  wagonModel: string;
}

const supplyRun = {
  handle: 'supply-run-valentine',
  name: 'Supply Run',
  taskType: 'delivery',
  config: {
    pickup: { x: -323.4, y: 803.1, z: 116.4 },
    dropoff: { x: 1372.6, y: -1301.9, z: 77.5 },
    wagonModel: 'wagon02x',
  },
  rewards: { payment: '35.00' },
  repeatConfig: { type: 'UNLIMITED' },
} satisfies Jobs.TaskDefinition<DeliveryConfig>;

PVJobs.registerTask('sheriff', supplyRun);
```

When the task later comes back to you — from `getAvailableTasks`, or as the definition behind an
instance's `taskHandle` — read `taskType` to decide which runner handles it and `config` for the
specifics.

## 3. Hooks

Source pattern: `resources/[core]/doors/src/client/misc/hooks.ts` and its export wrapper
`resources/[core]/doors/src/client/exports.ts`. Same shape — id, type, subject, unregister closure —
with one rule that differs: **a jobs hook cannot veto.** It is told what happened; it cannot stop it.

```typescript
import { PVJobs } from '@lib/server';

const unregister: (() => void)[] = [];

unregister.push(
  PVJobs.registerJobHook('sheriff-gear', 'onClockIn', 'sheriff', ({ characterId }) => {
    giveSheriffBadge(characterId);
  }),
);

unregister.push(
  PVJobs.registerJobHook('sheriff-gear', 'onClockOut', 'sheriff', ({ characterId, hoursWorked, payment }) => {
    removeSheriffGear(characterId);
    console.log(`[Sheriff] ${characterId} worked ${hoursWorked.toFixed(2)}h for $${payment.toFixed(2)}`);
  }),
);

unregister.push(
  PVJobs.registerJobHook('sheriff-patrol', 'onTaskStarted', 'sheriff', ({ characterId, instance }) => {
    if (instance.taskHandle !== 'patrol-valentine') {
      return;
    }
    startPatrolFor(characterId, instance.id);
  }),
);

on('onResourceStop', (resource: string) => {
  if (resource !== GetCurrentResourceName()) {
    return;
  }
  unregister.forEach((fn) => fn());
});
```

The payload type follows from the hook type, so `{ characterId, hoursWorked, payment }` destructures
without a cast. The `id` argument namespaces your registration: registering the same id for the same
type and job again replaces the previous callback rather than stacking a second one.

### The two payment hooks

Pay reaches a character in two steps, and there is a hook for each. `onPaySlipIssued` fires when a
shift settles or a task completes and a slip is written — the wages are *earned*, but nothing has
moved. `onPayment` fires when that slip is redeemed, and it is the only moment money changes hands.

```typescript
// Wages earned. Tell the player; do not credit anything.
PVJobs.registerJobHook('sheriff-wages', 'onPaySlipIssued', 'sheriff', ({ characterId, amount, reason }) => {
  notifyCharacter(characterId, `Pay slip written: $${amount.toFixed(2)} (${reason})`);
});

// Slip cashed. This — and only this — is where a bank credits a balance.
PVJobs.registerJobHook('sheriff-bank', 'onPayment', 'sheriff', ({ characterId, amount }) => {
  creditAccount(characterId, amount);
});
```

> **A bank integration subscribes to `onPayment` and nothing else.** The two hooks describe the same
> money at two different moments, so crediting on both pays every wage twice.

### What a hook cannot do

```typescript
// This does nothing. There is no veto.
PVJobs.registerJobHook('sheriff-gate', 'onClockIn', 'sheriff', () => false);
```

The socket server does not wait on the game server, so the clock-in has already been recorded by the
time the hook fires. Gate before the fact instead — with `clockInConstraints` on the job, or with
permissions (§4).

## 4. Permissions

Permissions are checked by `jobs` before a clock-in or a task start. Grants are durable rows in
`JobPermissions`.

> **Read this before you build a roster: permissions are open by default.** The check in
> `socket/src/managers/jobs.ts` returns **true** when no character at all holds an un-revoked grant
> for that `typeId`. A job or task nobody has been granted is open to everyone; the first grant is
> what closes it. "Nobody has permission" and "everybody has permission" are the same state.

```typescript
const hire = async (characterId: number, hiringOfficerCharacterId: number): Promise<void> => {
  // Allow this character to work the job at all. If this is the first grant for 'sheriff', it also
  // closes the job to everyone who is not on the roster from here on.
  await PVJobs.grantPermission(characterId, 'JOB', 'sheriff', hiringOfficerCharacterId);

  // Promotion: allow one specific task. Build the id with the helper, never by hand.
  await PVJobs.grantPermission(
    characterId,
    'TASK',
    PVJobs.taskPermissionId('sheriff', 'escort-valentine-prisoner'),
    hiringOfficerCharacterId,
  );
};
```

`taskPermissionId('sheriff', 'patrol-valentine')` returns `'sheriff:patrol-valentine'`. Using the
helper is what keeps your grants matching what the permission check looks for.

### Firing

Revocation is not a deny list, and that makes firing the interesting case:

```typescript
const fire = async (characterId: number): Promise<void> => {
  await PVJobs.revokePermission(characterId, 'JOB', 'sheriff');
};
```

That call does exactly one thing — it marks this character's grant revoked. It locks the character
out **only while somebody else still holds a grant for `'sheriff'`**. Revoke the last outstanding
grant and the job falls back to open access: the character you just fired can clock in again, and so
can everybody else.

The current API cannot express "fired" safely on its own. There is no deny row, and no export that
reports how many grants are outstanding, so `revokePermission` alone cannot tell whether it is about
to lock a character out or unlock the job for the server. A resource that needs a hard gate has to
carry it itself:

- Keep the roster in the owning resource and gate at your own call sites — the hiring UI, the
  clock-in prompt, the target option — instead of relying on the framework check as the only door.
  `resources/[tools]/research/src/client/stuff/police.ts` shows where those call sites live: the
  sheriff's desk target options each carry an `isEnabled()` of the resource's own, so the resource
  decides whether the option is offered at all.
- Never let the grant list for a gated job empty out. One permanent grant — the department head, an
  NPC roster character — keeps the job closed while individuals come and go.

A hook cannot help here: hooks fire after the fact and cannot veto (§3).

## 5. Server-driven assignment

A resource that generates work — the saloon's dirty tables from `PLANNING.md`, a dispatch call, a
delivery order — should register **one** task definition and vary the specifics per instance, not
register a definition per world object. Definitions are permanent for the socket server's lifetime;
instances are the disposable half.

```typescript
const cleanTable = {
  handle: 'clean-table',
  name: 'Clean Table',
  description: 'Wipe down a dirty table',
  taskType: 'cleaning',
  requirements: { rag: true },
  rewards: { payment: '5.00' },
  repeatConfig: {
    type: 'BURST',
    burstSize: 4,
    burstCooldownMinutes: 10,
    maxPerHour: 12,
  },
} satisfies Jobs.TaskDefinition;

PVJobs.registerTask('saloon', cleanTable);

const tablesByInstance = new Map<string, string>();

// Later, when a table gets dirty and a worker is on shift:
const dispatchTable = async (characterId: number, tableId: string): Promise<void> => {
  if (!PVJobs.isCharacterClockedIn(characterId)) {
    return;
  }

  const instance = await PVJobs.assignTask(characterId, 'saloon', 'clean-table');
  if (!instance) {
    return;
  }

  // The instance id is the handle for everything that follows.
  tablesByInstance.set(instance.id, tableId);
};
```

`assignTask` leaves the instance in `ASSIGNED`; the character starts it themselves. Finish it from
whichever side owns the gameplay:

```typescript
const onTableWiped = async (characterId: number, instanceId: string): Promise<void> => {
  const result = await PVJobs.completeTask(characterId, instanceId);
  if (result.success) {
    tablesByInstance.delete(instanceId);
  }
};
```

`completeTask` only succeeds on an `IN_PROGRESS` instance owned by that character. A completion is
what records a stamp in `JobTaskCooldowns`, which is what makes the `BURST` limits above bite.

The `rewards.payment` above pays because the `'saloon'` job it is registered under is `PER_TASK`. On
an `HOURLY` saloon job the same five dollars would never be written, and `result.payment` would come
back undefined on every wiped table.

## 6. Client side

Source: `resources/[core]/jobs/src/client/commands.ts` for the export style.

```typescript
import { PVJobs } from '@lib/client';

const runPatrol = async (): Promise<void> => {
  // Cached and synchronous — safe to poll from a tick or a target condition.
  const currentJob = PVJobs.getCurrentJob();
  if (!PVJobs.isCurrentlyClocked() || currentJob?.handle !== 'sheriff') {
    return;
  }

  const availability = await PVJobs.canStartTask('sheriff', 'patrol-valentine');
  if (!availability.canStart) {
    console.log(`[Sheriff] Cannot patrol: ${availability.reason}`);
    return;
  }

  // One step: creates the instance already IN_PROGRESS.
  const instance = await PVJobs.acceptTask('sheriff', 'patrol-valentine');
  if (!instance) {
    return;
  }

  await PVJobs.updateTaskProgress(instance.id, { checkpointsVisited: 1 });

  const result = await PVJobs.completeTask(instance.id);
  if (result.success) {
    // Undefined unless the job is PER_TASK — an HOURLY job pays at clock-out, not per completion.
    console.log(`[Sheriff] Patrol paid $${(result.payment ?? 0).toFixed(2)}`);
  }
};
```

That figure is real only because §1 declares `sheriff` as `PER_TASK`; it reads `$0.00` on an
`HOURLY` job no matter what the task's `rewards.payment` says. What a completion always does is
record the stamp that drives the cooldown — the payout is the part that depends on `paymentType`.

`acceptTask` is the client's shortcut past `ASSIGNED`. When the server assigned the work ahead of
time, the client picks it up instead:

```typescript
const resumeAssignedTask = async (): Promise<void> => {
  const [assigned] = await PVJobs.getActiveTasks();
  if (assigned?.status === 'ASSIGNED') {
    await PVJobs.startTask(assigned.id);
  }
};
```

Abandoning work is explicit — nothing times an instance out for you:

```typescript
const abandonPatrol = async (instanceId: string): Promise<void> => {
  await PVJobs.failTask(instanceId, 'Left the patrol zone');
};
```

## 7. Pay slips

A payout is a row in `JobPaySlips`, not money in an account — see the README's *Money* section.

```typescript
const cashOut = async (): Promise<void> => {
  const slips = await PVJobs.getPaySlips();
  const owed = slips.reduce((total, slip) => total + Number(slip.amount), 0);
  console.log(`[Sheriff] ${slips.length} unredeemed slips, $${owed.toFixed(2)} owed`);

  for (const slip of slips) {
    await PVJobs.redeemPaySlip(slip.id);
  }
};
```

`Jobs.PaySlip.id` is a database row id — the one numeric id in this API, and it belongs to a ledger
row, not to a job, task or instance.

Each `redeemPaySlip` that succeeds is what fires `onPayment` for that job — one per slip, carrying
that slip's amount and reason. The loop above therefore fires it once per slip, not once for the
total, which is why a bank hook credits `amount` rather than recomputing a balance.

## 8. Conventions worth keeping

- **Handles are param-case**: `sheriff`, `patrol-valentine`, `escort-valentine-prisoner`. They end up
  in event payloads and permission ids, so treat them as string literals per the repo `CLAUDE.md`.
- **Register on `socket.connected`, not on a resource start.** Definitions live in socket-server
  memory; a resource that registers its jobs once, at its own load, silently loses them the next
  time the socket server restarts.
- **Do not filter the client events by character id.** They are not broadcasts —
  `socket/src/controllers/jobs.ts` routes each one to the single player it concerns. The
  `characterId` argument names the character the payload describes; it is not a filter you are
  expected to apply.
- **Match `rewards.payment` to a `PER_TASK` job.** On any other `paymentType` it never pays.
- **Credit money on `onPayment` only.** `onPaySlipIssued` announces wages earned; taking both pays
  everything twice.
- **Do not persist an instance id.** It is meaningful only for the life of the socket server.
