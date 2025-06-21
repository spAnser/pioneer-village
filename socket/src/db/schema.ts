import {
  pgTable,
  serial,
  boolean,
  integer,
  varchar,
  timestamp,
  decimal,
  json,
  text,
  pgEnum,
  foreignKey,
  unique,
  smallint,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('Role', ['USER', 'DEVELOPER', 'ADMIN']);
export const genderEnum = pgEnum('Gender', ['MALE', 'FEMALE', 'OTHER']);
export const sealedEnum = pgEnum('Sealed', ['NONE', 'SEALED', 'BROKEN']);

// Tables
export const accounts = pgTable('Accounts', {
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

export const characters = pgTable('Characters', {
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
  healthMetadata: json('healthMetadata').default('{"health": 100, "stamina": 100, "litersOfBlood": 5, "boneHealth": [], "activeTonic": false, "sick": false, "boneStatus": []}'),
  components: json('components').default('[]'),
  model: varchar('model').default('mp_male'),
  whistle: json('whistle').default('{"pitch": 0.5, "shape": 5, "clarity": 0.5}'),
  features: json('features').default('{}'),
});

export const faces = pgTable('Faces', {
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

export const outfits = pgTable('Outfits', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  name: varchar('name').notNull(),
  components: json('components').default('[]'),
});

export const brands = pgTable('Brands', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  identifier: varchar('identifier').notNull(),
  ownerId: integer('ownerId').unique().notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const horses = pgTable('Horses', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  ownerId: integer('ownerId').notNull(),
  stable: varchar('stable'),
  brandId: integer('brandId'),
  breeds: json('breeds').notNull(),
  components: json('components').default('[]'),
  model: integer('model').notNull(),
  gender: genderEnum('gender').notNull(),
  age: integer('age').notNull(),
  weight: decimal('weight').notNull(),
  food: decimal('food').default('100.0'),
  water: decimal('water').default('100.0'),
  health: decimal('health').default('100.0'),
  cleanliness: decimal('cleanliness').default('100.0'),
  neuteredFixed: boolean('neuteredFixed').default(false),
  statOffRoad: integer('statOffRoad').notNull(),
  statHealth: integer('statHealth').notNull(),
  statEndurance: integer('statEndurance').notNull(),
  statFertility: integer('statFertility').notNull(),
  statHandling: integer('statHandling').notNull(),
  statSpeed: integer('statSpeed').notNull(),
  statAcceleration: integer('statAcceleration').notNull(),
  statBonding: json('statBonding'),
  hooves: decimal('hooves').notNull(),
  horseshoes: decimal('horseshoes').default('0.0'),
  metadata: json('metadata'),
  lastX: decimal('lastX').notNull(),
  lastY: decimal('lastY').notNull(),
  lastZ: decimal('lastZ').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const livestock = pgTable('Livestock', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  ownerId: integer('ownerId').unique().notNull(),
  model: integer('model').notNull(),
  brandId: integer('brandId').notNull(),
  lastX: decimal('lastX').notNull(),
  lastY: decimal('lastY').notNull(),
  lastZ: decimal('lastZ').notNull(),
});

export const inventory = pgTable('Inventory', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier').unique().notNull(),
  metadata: json('metadata').default('{}'),
  containerId: integer('containerId').unique().notNull(),
});

export const container = pgTable('Container', {
  id: serial('id').primaryKey(),
  locked: boolean('locked').default(false),
  sealed: sealedEnum('sealed').default('NONE'),
});

export const item = pgTable('Item', {
  id: serial('id').primaryKey(),
  metadata: json('metadata').default('{}'),
  containerId: integer('containerId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
  identifier: integer('identifier').notNull(),
  slot: integer('slot'),
  durability: integer('durability'),
});

export const door = pgTable('Door', {
  id: serial('id').primaryKey(),
  hash: integer('hash').notNull(),
  state: smallint('state').default(-1),
});

// Relations
export const accountsRelations = relations(accounts, ({ many }) => ({
  characters: many(characters),
}));

export const charactersRelations = relations(characters, ({ one, many }) => ({
  account: one(accounts, {
    fields: [characters.accountId],
    references: [accounts.id],
  }),
  face: one(faces, {
    fields: [characters.id],
    references: [faces.characterId],
  }),
  brand: one(brands, {
    fields: [characters.id],
    references: [brands.ownerId],
  }),
  horses: many(horses),
  livestock: one(livestock, {
    fields: [characters.id],
    references: [livestock.ownerId],
  }),
  outfits: many(outfits),
}));

export const facesRelations = relations(faces, ({ one }) => ({
  character: one(characters, {
    fields: [faces.characterId],
    references: [characters.id],
  }),
}));

export const outfitsRelations = relations(outfits, ({ one }) => ({
  character: one(characters, {
    fields: [outfits.characterId],
    references: [characters.id],
  }),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
  owner: one(characters, {
    fields: [brands.ownerId],
    references: [characters.id],
  }),
  horses: many(horses),
  livestock: many(livestock),
}));

export const horsesRelations = relations(horses, ({ one }) => ({
  owner: one(characters, {
    fields: [horses.ownerId],
    references: [characters.id],
  }),
  brand: one(brands, {
    fields: [horses.brandId],
    references: [brands.id],
  }),
}));

export const livestockRelations = relations(livestock, ({ one }) => ({
  owner: one(characters, {
    fields: [livestock.ownerId],
    references: [characters.id],
  }),
  brand: one(brands, {
    fields: [livestock.brandId],
    references: [brands.id],
  }),
}));

export const inventoryRelations = relations(inventory, ({ one }) => ({
  container: one(container, {
    fields: [inventory.containerId],
    references: [container.id],
  }),
}));

export const containerRelations = relations(container, ({ one, many }) => ({
  inventory: one(inventory, {
    fields: [container.id],
    references: [inventory.containerId],
  }),
  items: many(item),
}));

export const itemRelations = relations(item, ({ one }) => ({
  container: one(container, {
    fields: [item.containerId],
    references: [container.id],
  }),
}));

// Type exports for use in application
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Character = typeof characters.$inferSelect;
export type NewCharacter = typeof characters.$inferInsert;
export type Face = typeof faces.$inferSelect;
export type NewFace = typeof faces.$inferInsert;
export type Outfit = typeof outfits.$inferSelect;
export type NewOutfit = typeof outfits.$inferInsert;
export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
export type Horse = typeof horses.$inferSelect;
export type NewHorse = typeof horses.$inferInsert;
export type Livestock = typeof livestock.$inferSelect;
export type NewLivestock = typeof livestock.$inferInsert;
export type Inventory = typeof inventory.$inferSelect;
export type NewInventory = typeof inventory.$inferInsert;
export type Container = typeof container.$inferSelect;
export type NewContainer = typeof container.$inferInsert;
export type Item = typeof item.$inferSelect;
export type NewItem = typeof item.$inferInsert;
export type Door = typeof door.$inferSelect;
export type NewDoor = typeof door.$inferInsert;
