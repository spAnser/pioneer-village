import { relations } from 'drizzle-orm';
import {
  boolean,
  decimal,
  foreignKey,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  smallint,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/pg-core';

// Enums
export const roleEnum = pgEnum('Role', ['USER', 'DEVELOPER', 'ADMIN']);
export const genderEnum = pgEnum('Gender', ['MALE', 'FEMALE', 'OTHER']);
export const sealedEnum = pgEnum('Sealed', ['NONE', 'SEALED', 'BROKEN']);
export const paymentTypeEnum = pgEnum('PaymentType', ['HOURLY', 'PER_TASK', 'COMMISSION', 'SALARY', 'CALLBACK']);
export const taskStatusEnum = pgEnum('TaskStatus', [
  'AVAILABLE',
  'ASSIGNED',
  'IN_PROGRESS',
  'COMPLETED',
  'FAILED',
  'EXPIRED',
]);
export const permissionTypeEnum = pgEnum('PermissionType', ['JOB', 'TASK']);
export const repeatTypeEnum = pgEnum('RepeatType', ['COOLDOWN', 'BURST', 'WINDOW', 'UNLIMITED']);
export const pregnantEnum = pgEnum('PregnantStatus', ['ACTIVE', 'BIRTHED', 'LOST']);
export const pigeonStateEnum = pgEnum('PigeonState', ['DELIVERING', 'WAITING_REPLY', 'RETURNING']);
export const transferStatusEnum = pgEnum('TransferStatus', ['PENDING', 'COMPLETED', 'CANCELLED']);
export const loanStatusEnum = pgEnum('LoanStatus', ['ACTIVE', 'DEFAULTED', 'REPAID']);
export const bankTxTypeEnum = pgEnum('BankTxType', [
  'DEPOSIT',
  'WITHDRAWAL',
  'WIRE_OUT',
  'WIRE_IN',
  'WIRE_FEE',
  'INTEREST',
  'LOAN_CREDIT',
  'LOAN_REPAYMENT',
  'LOAN_INTEREST',
  'SAFETY_BOX_FEE',
  'SAFETY_BOX_SEIZURE',
  'ROBBERY_LOSS',
  'MINERAL_SALE',
]);

// Tables
export const AccountsSchema = pgTable('Accounts', {
  id: serial('id').primaryKey(),
  allowed: boolean('allowed').default(true),
  priority: integer('priority').default(10),
  identifier_steam: varchar('identifier_steam').unique().notNull(),
  identifier_fivem: varchar('identifier_fivem').unique(),
  identifier_discord: varchar('identifier_discord').unique(),
  identifier_ip: varchar('identifier_ip'),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
  bannedAt: timestamp('bannedAt'),
  role: roleEnum('role').default('USER'),
});

export const CharactersSchema = pgTable('Characters', {
  id: serial('id').primaryKey(),
  accountId: integer('accountId').notNull(),
  firstName: varchar('firstName').notNull(),
  lastName: varchar('lastName').notNull(),
  dateOfBirth: timestamp('dateOfBirth').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
  lastX: decimal('lastX').default('0.0'),
  lastY: decimal('lastY').default('0.0'),
  lastZ: decimal('lastZ').default('0.0'),
  food: decimal('food').default('100.0'),
  drink: decimal('drink').default('100.0'),
  currencies: json('currencies').default('{"dollars": 20, "gold": 0}'),
  healthMetadata: json('healthMetadata').default(
    '{"health": 100, "stamina": 100, "litersOfBlood": 5, "boneHealth": [], "activeTonic": false, "sick": false, "boneStatus": []}',
  ),
  components: json('components').default('[]'),
  model: varchar('model').default('mp_male'),
  whistle: json('whistle').default('{"pitch": 0.5, "shape": 5, "clarity": 0.5}'),
  features: json('features').default('{}'),
});

export const FacesSchema = pgTable('Faces', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').unique().notNull(),
  noseHeight: decimal('noseHeight').default('0.0'),
  lowerLipWidth: decimal('lowerLipWidth').default('0.0'),
  upperLipHeight: decimal('upperLipHeight').default('0.0'),
  earlobeSize: decimal('earlobeSize').default('0.0'),
  lowerLipHeight: decimal('lowerLipHeight').default('0.0'),
  eyebrowHeight: decimal('eyebrowHeight').default('0.0'),
  jawHeight: decimal('jawHeight').default('0.0'),
  eyesDistance: decimal('eyesDistance').default('0.0'),
  mouthDepth: decimal('mouthDepth').default('0.0'),
  mouthWidth: decimal('mouthWidth').default('0.0'),
  noseCurvature: decimal('noseCurvature').default('0.0'),
  eyebrowDepth: decimal('eyebrowDepth').default('0.0'),
  earsHeight: decimal('earsHeight').default('0.0'),
  noseSize: decimal('noseSize').default('0.0'),
  headWidth: decimal('headWidth').default('0.0'),
  eyelidWidth: decimal('eyelidWidth').default('0.0'),
  mouthYPos: decimal('mouthYPos').default('0.0'),
  earsWidth: decimal('earsWidth').default('0.0'),
  jawWidth: decimal('jawWidth').default('0.0'),
  nostrilsDistance: decimal('nostrilsDistance').default('0.0'),
  noseWidth: decimal('noseWidth').default('0.0'),
  eyesHeight: decimal('eyesHeight').default('0.0'),
  chinHeight: decimal('chinHeight').default('0.0'),
  upperLipWidth: decimal('upperLipWidth').default('0.0'),
  eyebrowWidth: decimal('eyebrowWidth').default('0.0'),
  cheekBoneWidth: decimal('cheekBoneWidth').default('0.0'),
  chinWidth: decimal('chinWidth').default('0.0'),
  eyesAngle: decimal('eyesAngle').default('0.0'),
  earsAngle: decimal('earsAngle').default('0.0'),
  jawDepth: decimal('jawDepth').default('0.0'),
  eyelidHeight: decimal('eyelidHeight').default('0.0'),
  cheekBoneHeight: decimal('cheekBoneHeight').default('0.0'),
  chinDepth: decimal('chinDepth').default('0.0'),
  cheekBoneDepth: decimal('cheekBoneDepth').default('0.0'),
  upperLipDepth: decimal('upperLipDepth').default('0.0'),
  noseAngle: decimal('noseAngle').default('0.0'),
  mouthXPos: decimal('mouthXPos').default('0.0'),
  lowerLipDepth: decimal('lowerLipDepth').default('0.0'),
  eyesDepth: decimal('eyesDepth').default('0.0'),
  overlays: json('overlays'),
});

export const OutfitsSchema = pgTable('Outfits', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  name: varchar('name').notNull(),
  components: json('components').default('[]'),
});

export const BrandsSchema = pgTable('Brands', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  identifier: varchar('identifier').notNull(),
  ownerId: integer('ownerId').unique().notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const HorsesSchema = pgTable('Horses', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  ownerId: integer('ownerId').notNull(),
  stable: varchar('stable'),
  brandId: integer('brandId'),
  breeds: json('breeds').notNull().$type<Record<string, number>>(),
  components: json('components').default('[]'),
  model: integer('model').notNull(),
  gender: genderEnum('gender').notNull(),
  age: integer('age').notNull(),
  agingPaused: boolean('agingPaused').default(false),
  agingLastUpdate: timestamp('agingLastUpdate').defaultNow().notNull(),
  pelts: json('pelts').default('[]').$type<Array<[number, number]>>(),
  corpses: json('corpses').default('{}').$type<Array<[number, number, number]>>(),
  weight: decimal('weight').notNull(),
  food: decimal('food').default('100.0'),
  water: decimal('water').default('100.0'),
  health: decimal('health').default('100.0'),
  cleanliness: decimal('cleanliness').default('100.0'),
  neuteredFixed: boolean('neuteredFixed').default(false),
  dna: json('dna').notNull().$type<Record<string, any>>(),
  statBonding: json('statBonding'),
  hooves: decimal('hooves').notNull(),
  horseshoes: decimal('horseshoes').default('0.0'),
  metadata: json('metadata'),
  lastX: decimal('lastX').notNull(),
  lastY: decimal('lastY').notNull(),
  lastZ: decimal('lastZ').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const HorsePregnancySchema = pgTable('HorsePregnancy', {
  id: serial('id').primaryKey(),
  motherHorseId: integer('motherHorseId').notNull(),
  fatherHorseId: integer('fatherHorseId').notNull(),
  foalHorseId: integer('foalHorseId').notNull(),
  conceivedAt: timestamp('conceivedAt').defaultNow().notNull(),
  status: pregnantEnum('status').default('ACTIVE').notNull(),
});

export const LivestockSchema = pgTable('Livestock', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  ownerId: integer('ownerId').unique().notNull(),
  model: integer('model').notNull(),
  brandId: integer('brandId').notNull(),
  lastX: decimal('lastX').notNull(),
  lastY: decimal('lastY').notNull(),
  lastZ: decimal('lastZ').notNull(),
});

export const InventorySchema = pgTable('Inventory', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier').unique().notNull(),
  metadata: json('metadata').default('{}'),
  containerId: integer('containerId').unique().notNull(),
});

export const ContainerSchema = pgTable('Container', {
  id: serial('id').primaryKey(),
  locked: boolean('locked').default(false),
  sealed: sealedEnum('sealed').default('NONE'),
});

export const ItemSchema = pgTable('Item', {
  id: serial('id').primaryKey(),
  metadata: json('metadata').default('{}'),
  containerId: integer('containerId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
  identifier: integer('identifier').notNull(),
  slot: integer('slot'),
  durability: integer('durability'),
});

export const DoorSchema = pgTable('Door', {
  id: serial('id').primaryKey(),
  hash: integer('hash').notNull(),
  state: smallint('state').default(-1),
});

export const WorldObjectsSchema = pgTable('WorldObjects', {
  id: serial('id').primaryKey(),
  name: varchar('name').unique().notNull(),
  model: varchar('model').notNull(),
  x: decimal('x').notNull(),
  y: decimal('y').notNull(),
  z: decimal('z').notNull(),
  rotX: decimal('rotX').default('0.0'),
  rotY: decimal('rotY').default('0.0'),
  rotZ: decimal('rotZ').default('0.0'),
  networked: boolean('networked').default(true),
  state: json('state').default('{}').$type<Record<string, unknown>>(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const PigeonDeliveriesSchema = pgTable('PigeonDeliveries', {
  id: serial('id').primaryKey(),
  pigeonItemId: integer('pigeonItemId').notNull(),
  birdType: varchar('birdType').notNull(),
  state: pigeonStateEnum('state').notNull(),
  ownerId: integer('ownerId').notNull(),
  receiverId: integer('receiverId').notNull(),
  originX: decimal('originX').notNull(),
  originY: decimal('originY').notNull(),
  originZ: decimal('originZ').notNull(),
  destX: decimal('destX').notNull(),
  destY: decimal('destY').notNull(),
  destZ: decimal('destZ').notNull(),
  totalDistance: decimal('totalDistance').notNull(),
  distanceCovered: decimal('distanceCovered').default('0'),
  lastTickAt: timestamp('lastTickAt').defaultNow().notNull(),
  stateChangedAt: timestamp('stateChangedAt').defaultNow().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Job System Tables
export const JobsSchema = pgTable('Jobs', {
  id: serial('id').primaryKey(),
  handle: varchar('handle').unique().notNull(),
  name: varchar('name').notNull(),
  description: text('description'),
  paymentType: paymentTypeEnum('paymentType').default('HOURLY'),
  paymentAmount: decimal('paymentAmount').default('0.0'),
  requirements: json('requirements').default('{}'),
  inventory: json('inventory').default('{}'),
  clockInConstraints: json('clockInConstraints').default('{}'),
  metadata: json('metadata').default('{}'),
  active: boolean('active').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const JobTasksSchema = pgTable('JobTasks', {
  id: serial('id').primaryKey(),
  jobId: integer('jobId').notNull(),
  handle: varchar('handle').notNull(),
  name: varchar('name').notNull(),
  description: text('description'),
  taskType: varchar('taskType').notNull(),
  requirements: json('requirements').default('{}'),
  rewards: json('rewards').default('{}'),
  timeConstraints: json('timeConstraints').default('{}'),
  repeatConfig: json('repeatConfig').default('{}'),
  rateLimits: json('rateLimits').default('{}'),
  metadata: json('metadata').default('{}'),
  active: boolean('active').default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const JobEmployeesSchema = pgTable('JobEmployees', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  jobId: integer('jobId').notNull(),
  position: varchar('position').default('Employee'),
  salary: decimal('salary').default('0.0'),
  clockedInAt: timestamp('clockedInAt'),
  totalHoursWorked: decimal('totalHoursWorked').default('0.0'),
  hiredAt: timestamp('hiredAt').defaultNow(),
  firedAt: timestamp('firedAt'),
  metadata: json('metadata').default('{}'),
});

export const JobPermissionsSchema = pgTable('JobPermissions', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  type: permissionTypeEnum('type').notNull(),
  typeId: varchar('typeId').notNull(),
  grantedAt: timestamp('grantedAt').defaultNow(),
  grantedBy: integer('grantedBy'),
  revokedAt: timestamp('revokedAt'),
  metadata: json('metadata').default('{}'),
});

export const JobTaskInstancesSchema = pgTable('JobTaskInstances', {
  id: serial('id').primaryKey(),
  taskId: integer('taskId').notNull(),
  assignedTo: integer('assignedTo'),
  status: taskStatusEnum('status').default('AVAILABLE'),
  progress: json('progress').default('{}'),
  createdAt: timestamp('createdAt').defaultNow(),
  assignedAt: timestamp('assignedAt'),
  startedAt: timestamp('startedAt'),
  completedAt: timestamp('completedAt'),
  scheduledFor: timestamp('scheduledFor'),
  expiresAt: timestamp('expiresAt'),
  metadata: json('metadata').default('{}'),
});

export const JobTaskCooldownsSchema = pgTable('JobTaskCooldowns', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  taskId: integer('taskId').notNull(),
  lastCompletedAt: timestamp('lastCompletedAt').notNull(),
  completionCount: integer('completionCount').default(1),
  hourlyResetAt: timestamp('hourlyResetAt').notNull(),
  hourlyCount: integer('hourlyCount').default(1),
  dailyResetAt: timestamp('dailyResetAt').notNull(),
  dailyCount: integer('dailyCount').default(1),
  metadata: json('metadata').default('{}'),
});

export const JobPaySlipsSchema = pgTable('JobPaySlips', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  jobId: integer('jobId').notNull(),
  amount: decimal('amount').notNull(),
  reason: varchar('reason').notNull(),
  jobHandle: varchar('jobHandle').notNull(),
  bankId: varchar('bankId').notNull().default(''),
  redeemed: boolean('redeemed').default(false),
  redeemedAt: timestamp('redeemedAt'),
  createdAt: timestamp('createdAt').defaultNow(),
  metadata: json('metadata').default('{}'),
});

// Banking Tables
export const BankAccountsSchema = pgTable('BankAccounts', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  bankId: varchar('bankId').notNull(),
  balance: decimal('balance').default('0.00').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt'),
});

export const BankTransfersSchema = pgTable('BankTransfers', {
  id: serial('id').primaryKey(),
  fromCharacterId: integer('fromCharacterId').notNull(),
  toCharacterId: integer('toCharacterId').notNull(),
  fromBankId: varchar('fromBankId').notNull(),
  toBankId: varchar('toBankId').notNull(),
  amount: decimal('amount').notNull(),
  fee: decimal('fee').notNull(),
  status: transferStatusEnum('status').default('PENDING').notNull(),
  scheduledAt: timestamp('scheduledAt').notNull(),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const BankVaultsSchema = pgTable('BankVaults', {
  id: serial('id').primaryKey(),
  bankId: varchar('bankId').unique().notNull(),
  vaultBalance: decimal('vaultBalance').default('0.00').notNull(),
  lastRobbedAt: timestamp('lastRobbedAt'),
  robberyCount: integer('robberyCount').default(0).notNull(),
  reputationScore: smallint('reputationScore').default(100).notNull(),
  updatedAt: timestamp('updatedAt'),
});

export const BankLoansSchema = pgTable('BankLoans', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  bankId: varchar('bankId').notNull(),
  principal: decimal('principal').notNull(),
  outstanding: decimal('outstanding').notNull(),
  collateralItemId: integer('collateralItemId'),
  issuedAt: timestamp('issuedAt').defaultNow(),
  dueAt: timestamp('dueAt').notNull(),
  missedPayments: smallint('missedPayments').default(0).notNull(),
  status: loanStatusEnum('status').default('ACTIVE').notNull(),
});

export const BankSafetyBoxesSchema = pgTable('BankSafetyBoxes', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  bankId: varchar('bankId').notNull(),
  inventoryId: integer('inventoryId'),
  rentedAt: timestamp('rentedAt').defaultNow(),
  nextDueAt: timestamp('nextDueAt').notNull(),
  weeklyFee: decimal('weeklyFee').default('10.00').notNull(),
  active: boolean('active').default(true).notNull(),
});

export const BankTransactionsSchema = pgTable('BankTransactions', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  bankId: varchar('bankId').notNull(),
  type: bankTxTypeEnum('type').notNull(),
  amount: decimal('amount').notNull(),
  balanceAfter: decimal('balanceAfter').notNull(),
  relatedId: integer('relatedId'),
  note: varchar('note'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

export const BankMineralBudgetsSchema = pgTable('BankMineralBudgets', {
  id: serial('id').primaryKey(),
  bankId: varchar('bankId').notNull(),
  dailyLimit: decimal('dailyLimit').notNull(),
  spentToday: decimal('spentToday').default('0.00').notNull(),
  priceMultiplier: decimal('priceMultiplier').default('1.00').notNull(),
  resetAt: timestamp('resetAt').notNull(),
  updatedAt: timestamp('updatedAt'),
});

// Relations
export const accountsRelations = relations(AccountsSchema, ({ many }) => ({
  characters: many(CharactersSchema),
}));

export const charactersRelations = relations(CharactersSchema, ({ one, many }) => ({
  account: one(AccountsSchema, {
    fields: [CharactersSchema.accountId],
    references: [AccountsSchema.id],
  }),
  face: one(FacesSchema, {
    fields: [CharactersSchema.id],
    references: [FacesSchema.characterId],
  }),
  brand: one(BrandsSchema, {
    fields: [CharactersSchema.id],
    references: [BrandsSchema.ownerId],
  }),
  horses: many(HorsesSchema),
  livestock: one(LivestockSchema, {
    fields: [CharactersSchema.id],
    references: [LivestockSchema.ownerId],
  }),
  outfits: many(OutfitsSchema),
  jobEmployees: many(JobEmployeesSchema),
  jobPermissions: many(JobPermissionsSchema),
  jobTaskInstances: many(JobTaskInstancesSchema),
  jobTaskCooldowns: many(JobTaskCooldownsSchema),
  jobPaySlips: many(JobPaySlipsSchema),
}));

export const facesRelations = relations(FacesSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [FacesSchema.characterId],
    references: [CharactersSchema.id],
  }),
}));

export const outfitsRelations = relations(OutfitsSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [OutfitsSchema.characterId],
    references: [CharactersSchema.id],
  }),
}));

export const brandsRelations = relations(BrandsSchema, ({ one, many }) => ({
  owner: one(CharactersSchema, {
    fields: [BrandsSchema.ownerId],
    references: [CharactersSchema.id],
  }),
  horses: many(HorsesSchema),
  livestock: many(LivestockSchema),
}));

export const horsesRelations = relations(HorsesSchema, ({ one }) => ({
  owner: one(CharactersSchema, {
    fields: [HorsesSchema.ownerId],
    references: [CharactersSchema.id],
  }),
  brand: one(BrandsSchema, {
    fields: [HorsesSchema.brandId],
    references: [BrandsSchema.id],
  }),
}));

export const livestockRelations = relations(LivestockSchema, ({ one }) => ({
  owner: one(CharactersSchema, {
    fields: [LivestockSchema.ownerId],
    references: [CharactersSchema.id],
  }),
  brand: one(BrandsSchema, {
    fields: [LivestockSchema.brandId],
    references: [BrandsSchema.id],
  }),
}));

export const inventoryRelations = relations(InventorySchema, ({ one }) => ({
  container: one(ContainerSchema, {
    fields: [InventorySchema.containerId],
    references: [ContainerSchema.id],
  }),
}));

export const containerRelations = relations(ContainerSchema, ({ one, many }) => ({
  inventory: one(InventorySchema, {
    fields: [ContainerSchema.id],
    references: [InventorySchema.containerId],
  }),
  items: many(ItemSchema),
}));

export const itemRelations = relations(ItemSchema, ({ one }) => ({
  container: one(ContainerSchema, {
    fields: [ItemSchema.containerId],
    references: [ContainerSchema.id],
  }),
}));

// Job System Relations
export const jobsRelations = relations(JobsSchema, ({ many }) => ({
  tasks: many(JobTasksSchema),
  employees: many(JobEmployeesSchema),
  jobPaySlips: many(JobPaySlipsSchema),
}));

export const jobTasksRelations = relations(JobTasksSchema, ({ one, many }) => ({
  job: one(JobsSchema, {
    fields: [JobTasksSchema.jobId],
    references: [JobsSchema.id],
  }),
  instances: many(JobTaskInstancesSchema),
  cooldowns: many(JobTaskCooldownsSchema),
}));

export const jobEmployeesRelations = relations(JobEmployeesSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [JobEmployeesSchema.characterId],
    references: [CharactersSchema.id],
  }),
  job: one(JobsSchema, {
    fields: [JobEmployeesSchema.jobId],
    references: [JobsSchema.id],
  }),
}));

export const jobPermissionsRelations = relations(JobPermissionsSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [JobPermissionsSchema.characterId],
    references: [CharactersSchema.id],
  }),
  grantedByCharacter: one(CharactersSchema, {
    fields: [JobPermissionsSchema.grantedBy],
    references: [CharactersSchema.id],
  }),
}));

export const jobTaskInstancesRelations = relations(JobTaskInstancesSchema, ({ one }) => ({
  task: one(JobTasksSchema, {
    fields: [JobTaskInstancesSchema.taskId],
    references: [JobTasksSchema.id],
  }),
  assignedToCharacter: one(CharactersSchema, {
    fields: [JobTaskInstancesSchema.assignedTo],
    references: [CharactersSchema.id],
  }),
}));

export const jobTaskCooldownsRelations = relations(JobTaskCooldownsSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [JobTaskCooldownsSchema.characterId],
    references: [CharactersSchema.id],
  }),
  task: one(JobTasksSchema, {
    fields: [JobTaskCooldownsSchema.taskId],
    references: [JobTasksSchema.id],
  }),
}));

export const jobPaySlipsRelations = relations(JobPaySlipsSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [JobPaySlipsSchema.characterId],
    references: [CharactersSchema.id],
  }),
  job: one(JobsSchema, {
    fields: [JobPaySlipsSchema.jobId],
    references: [JobsSchema.id],
  }),
}));

export const bankAccountsRelations = relations(BankAccountsSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [BankAccountsSchema.characterId],
    references: [CharactersSchema.id],
  }),
}));

export const bankTransfersFromRelations = relations(BankTransfersSchema, ({ one }) => ({
  fromCharacter: one(CharactersSchema, {
    fields: [BankTransfersSchema.fromCharacterId],
    references: [CharactersSchema.id],
  }),
  toCharacter: one(CharactersSchema, {
    fields: [BankTransfersSchema.toCharacterId],
    references: [CharactersSchema.id],
  }),
}));

export const bankLoansRelations = relations(BankLoansSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [BankLoansSchema.characterId],
    references: [CharactersSchema.id],
  }),
}));

export const bankSafetyBoxesRelations = relations(BankSafetyBoxesSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [BankSafetyBoxesSchema.characterId],
    references: [CharactersSchema.id],
  }),
}));

export const bankTransactionsRelations = relations(BankTransactionsSchema, ({ one }) => ({
  character: one(CharactersSchema, {
    fields: [BankTransactionsSchema.characterId],
    references: [CharactersSchema.id],
  }),
}));

// Type exports for use in application
export type AccountSchemaType = typeof AccountsSchema.$inferSelect;
export type NewAccountSchemaType = typeof AccountsSchema.$inferInsert;
export type CharacterSchemaType = typeof CharactersSchema.$inferSelect;
export type NewCharacterSchemaType = typeof CharactersSchema.$inferInsert;
export type FaceSchemaType = typeof FacesSchema.$inferSelect;
export type NewFaceSchemaType = typeof FacesSchema.$inferInsert;
export type OutfitSchemaType = typeof OutfitsSchema.$inferSelect;
export type NewOutfitSchemaType = typeof OutfitsSchema.$inferInsert;
export type BrandSchemaType = typeof BrandsSchema.$inferSelect;
export type NewBrandSchemaType = typeof BrandsSchema.$inferInsert;
export type HorseSchemaType = typeof HorsesSchema.$inferSelect;
export type NewHorseSchemaType = typeof HorsesSchema.$inferInsert;
export type HorsePregnancySchemaType = typeof HorsePregnancySchema.$inferSelect;
export type NewHorsePregnancySchemaType = typeof HorsePregnancySchema.$inferInsert;
export type LivestockSchemaType = typeof LivestockSchema.$inferSelect;
export type NewLivestockSchemaType = typeof LivestockSchema.$inferInsert;
export type InventorySchemaType = typeof InventorySchema.$inferSelect;
export type NewInventorySchemaType = typeof InventorySchema.$inferInsert;
export type ContainerSchemaType = typeof ContainerSchema.$inferSelect;
export type NewContainerSchemaType = typeof ContainerSchema.$inferInsert;
export type ItemSchemaType = typeof ItemSchema.$inferSelect;
export type NewItemSchemaType = typeof ItemSchema.$inferInsert;
export type DoorSchemaType = typeof DoorSchema.$inferSelect;
export type NewDoorSchemaType = typeof DoorSchema.$inferInsert;
export type WorldObjectSchemaType = typeof WorldObjectsSchema.$inferSelect;
export type NewWorldObjectSchemaType = typeof WorldObjectsSchema.$inferInsert;
export type JobSchemaType = typeof JobsSchema.$inferSelect;
export type NewJobSchemaType = typeof JobsSchema.$inferInsert;
export type JobTaskSchemaType = typeof JobTasksSchema.$inferSelect;
export type NewJobTaskSchemaType = typeof JobTasksSchema.$inferInsert;
export type JobEmployeeSchemaType = typeof JobEmployeesSchema.$inferSelect;
export type NewJobEmployeeSchemaType = typeof JobEmployeesSchema.$inferInsert;
export type JobPermissionSchemaType = typeof JobPermissionsSchema.$inferSelect;
export type NewJobPermissionSchemaType = typeof JobPermissionsSchema.$inferInsert;
export type JobTaskInstanceSchemaType = typeof JobTaskInstancesSchema.$inferSelect;
export type NewJobTaskInstanceSchemaType = typeof JobTaskInstancesSchema.$inferInsert;
export type JobTaskCooldownSchemaType = typeof JobTaskCooldownsSchema.$inferSelect;
export type NewJobTaskCooldownSchemaType = typeof JobTaskCooldownsSchema.$inferInsert;
export type JobPaySlipSchemaType = typeof JobPaySlipsSchema.$inferSelect;
export type NewJobPaySlipSchemaType = typeof JobPaySlipsSchema.$inferInsert;
export type PigeonDeliverySchemaType = typeof PigeonDeliveriesSchema.$inferSelect;
export type NewPigeonDeliverySchemaType = typeof PigeonDeliveriesSchema.$inferInsert;
export type BankAccountSchemaType = typeof BankAccountsSchema.$inferSelect;
export type NewBankAccountSchemaType = typeof BankAccountsSchema.$inferInsert;
export type BankTransferSchemaType = typeof BankTransfersSchema.$inferSelect;
export type NewBankTransferSchemaType = typeof BankTransfersSchema.$inferInsert;
export type BankVaultSchemaType = typeof BankVaultsSchema.$inferSelect;
export type NewBankVaultSchemaType = typeof BankVaultsSchema.$inferInsert;
export type BankLoanSchemaType = typeof BankLoansSchema.$inferSelect;
export type NewBankLoanSchemaType = typeof BankLoansSchema.$inferInsert;
export type BankSafetyBoxSchemaType = typeof BankSafetyBoxesSchema.$inferSelect;
export type NewBankSafetyBoxSchemaType = typeof BankSafetyBoxesSchema.$inferInsert;
export type BankTransactionSchemaType = typeof BankTransactionsSchema.$inferSelect;
export type NewBankTransactionSchemaType = typeof BankTransactionsSchema.$inferInsert;
export type BankMineralBudgetSchemaType = typeof BankMineralBudgetsSchema.$inferSelect;
export type NewBankMineralBudgetSchemaType = typeof BankMineralBudgetsSchema.$inferInsert;
