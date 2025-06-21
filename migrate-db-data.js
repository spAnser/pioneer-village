const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const { config } = require('dotenv');

// Load environment variables
config();

// Import schema (we'll define it inline to avoid TypeScript issues)
const {
  pgTable,
  serial,
  boolean,
  integer,
  varchar,
  timestamp,
  decimal,
  json,
  pgEnum,
  smallint,
} = require('drizzle-orm/pg-core');

// Define enums
const roleEnum = pgEnum('Role', ['USER', 'DEVELOPER', 'ADMIN']);
const genderEnum = pgEnum('Gender', ['MALE', 'FEMALE', 'OTHER']);
const sealedEnum = pgEnum('Sealed', ['NONE', 'SEALED', 'BROKEN']);

// Define tables (matching the schema)
const accounts = pgTable('Accounts', {
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

const characters = pgTable('Characters', {
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

const faces = pgTable('Faces', {
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

const outfits = pgTable('Outfits', {
  id: serial('id').primaryKey(),
  characterId: integer('characterId').notNull(),
  name: varchar('name').notNull(),
  components: json('components').default('[]'),
});

const brands = pgTable('Brands', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  identifier: varchar('identifier').notNull(),
  ownerId: integer('ownerId').unique().notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
});

const horses = pgTable('Horses', {
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

const livestock = pgTable('Livestock', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  ownerId: integer('ownerId').unique().notNull(),
  model: integer('model').notNull(),
  brandId: integer('brandId').notNull(),
  lastX: decimal('lastX').notNull(),
  lastY: decimal('lastY').notNull(),
  lastZ: decimal('lastZ').notNull(),
});

const inventory = pgTable('Inventory', {
  id: serial('id').primaryKey(),
  identifier: varchar('identifier').unique().notNull(),
  metadata: json('metadata').default('{}'),
  containerId: integer('containerId').unique().notNull(),
});

const container = pgTable('Container', {
  id: serial('id').primaryKey(),
  locked: boolean('locked').default(false),
  sealed: sealedEnum('sealed').default('NONE'),
});

const item = pgTable('Item', {
  id: serial('id').primaryKey(),
  metadata: json('metadata').default('{}'),
  containerId: integer('containerId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  deletedAt: timestamp('deletedAt'),
  identifier: integer('identifier').notNull(),
  slot: integer('slot'),
  durability: integer('durability'),
});

const door = pgTable('Door', {
  id: serial('id').primaryKey(),
  hash: integer('hash').notNull(),
  state: smallint('state').default(-1),
});

// Database connections
const oldPool = new Pool({
  connectionString: process.env.DATABASE_URL_OLD,
});

const newPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const oldDb = drizzle(oldPool);
const newDb = drizzle(newPool);

// Migration functions
async function migrateAccounts() {
  console.log('Migrating Accounts...');
  try {
    const oldAccounts = await oldDb.select().from(accounts);
    console.log(`Found ${oldAccounts.length} accounts to migrate`);
    
    for (const account of oldAccounts) {
      await newDb.insert(accounts).values({
        id: account.id,
        allowed: account.allowed,
        priority: account.priority,
        identifier_steam: account.identifier_steam,
        identifier_fivem: account.identifier_fivem,
        identifier_discord: account.identifier_discord,
        identifier_ip: account.identifier_ip,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
        bannedAt: account.bannedAt,
        role: account.role,
      }).onConflictDoNothing();
    }
    console.log('✅ Accounts migration completed');
  } catch (error) {
    console.error('❌ Error migrating accounts:', error);
  }
}

async function migrateCharacters() {
  console.log('Migrating Characters...');
  try {
    // First, check if the features column exists in the old database
    let hasFeatures = false;
    try {
      await oldPool.query('SELECT features FROM "Characters" LIMIT 1');
      hasFeatures = true;
      console.log('✅ Old database has features column');
    } catch (error) {
      console.log('ℹ️ Old database does not have features column, will use default value');
    }

    // Select characters with or without features column
    let oldCharacters;
    if (hasFeatures) {
      oldCharacters = await oldDb.select().from(characters);
    } else {
      // Select without features column
      oldCharacters = await oldDb.select({
        id: characters.id,
        accountId: characters.accountId,
        firstName: characters.firstName,
        lastName: characters.lastName,
        dateOfBirth: characters.dateOfBirth,
        createdAt: characters.createdAt,
        deletedAt: characters.deletedAt,
        lastX: characters.lastX,
        lastY: characters.lastY,
        lastZ: characters.lastZ,
        food: characters.food,
        drink: characters.drink,
        currencies: characters.currencies,
        healthMetadata: characters.healthMetadata,
        components: characters.components,
        model: characters.model,
        whistle: characters.whistle,
      }).from(characters);
    }

    console.log(`Found ${oldCharacters.length} characters to migrate`);
    
    for (const character of oldCharacters) {
      await newDb.insert(characters).values({
        id: character.id,
        accountId: character.accountId,
        firstName: character.firstName,
        lastName: character.lastName,
        dateOfBirth: character.dateOfBirth,
        createdAt: character.createdAt,
        deletedAt: character.deletedAt,
        lastX: character.lastX,
        lastY: character.lastY,
        lastZ: character.lastZ,
        food: character.food,
        drink: character.drink,
        currencies: character.currencies,
        healthMetadata: character.healthMetadata,
        components: character.components,
        model: character.model,
        whistle: character.whistle,
        features: hasFeatures ? (character.features || {}) : {},
      }).onConflictDoNothing();
    }
    console.log('✅ Characters migration completed');
  } catch (error) {
    console.error('❌ Error migrating characters:', error);
  }
}

async function migrateFaces() {
  console.log('Migrating Faces...');
  try {
    const oldFaces = await oldDb.select().from(faces);
    console.log(`Found ${oldFaces.length} faces to migrate`);
    
    for (const face of oldFaces) {
      await newDb.insert(faces).values({
        id: face.id,
        characterId: face.characterId,
        noseHeight: face.noseHeight,
        lowerLipWidth: face.lowerLipWidth,
        upperLipHeight: face.upperLipHeight,
        earlobeSize: face.earlobeSize,
        lowerLipHeight: face.lowerLipHeight,
        eyebrowHeight: face.eyebrowHeight,
        jawHeight: face.jawHeight,
        eyesDistance: face.eyesDistance,
        mouthDepth: face.mouthDepth,
        mouthWidth: face.mouthWidth,
        noseCurvature: face.noseCurvature,
        eyebrowDepth: face.eyebrowDepth,
        earsHeight: face.earsHeight,
        noseSize: face.noseSize,
        headWidth: face.headWidth,
        eyelidWidth: face.eyelidWidth,
        mouthYPos: face.mouthYPos,
        earsWidth: face.earsWidth,
        jawWidth: face.jawWidth,
        nostrilsDistance: face.nostrilsDistance,
        noseWidth: face.noseWidth,
        eyesHeight: face.eyesHeight,
        chinHeight: face.chinHeight,
        upperLipWidth: face.upperLipWidth,
        eyebrowWidth: face.eyebrowWidth,
        cheekBoneWidth: face.cheekBoneWidth,
        chinWidth: face.chinWidth,
        eyesAngle: face.eyesAngle,
        earsAngle: face.earsAngle,
        jawDepth: face.jawDepth,
        eyelidHeight: face.eyelidHeight,
        cheekBoneHeight: face.cheekBoneHeight,
        chinDepth: face.chinDepth,
        cheekBoneDepth: face.cheekBoneDepth,
        upperLipDepth: face.upperLipDepth,
        noseAngle: face.noseAngle,
        mouthXPos: face.mouthXPos,
        lowerLipDepth: face.lowerLipDepth,
        eyesDepth: face.eyesDepth,
        overlays: face.overlays,
      }).onConflictDoNothing();
    }
    console.log('✅ Faces migration completed');
  } catch (error) {
    console.error('❌ Error migrating faces:', error);
  }
}

async function migrateOutfits() {
  console.log('Migrating Outfits...');
  try {
    const oldOutfits = await oldDb.select().from(outfits);
    console.log(`Found ${oldOutfits.length} outfits to migrate`);
    
    for (const outfit of oldOutfits) {
      await newDb.insert(outfits).values({
        id: outfit.id,
        characterId: outfit.characterId,
        name: outfit.name,
        components: outfit.components,
      }).onConflictDoNothing();
    }
    console.log('✅ Outfits migration completed');
  } catch (error) {
    console.error('❌ Error migrating outfits:', error);
  }
}

async function migrateBrands() {
  console.log('Migrating Brands...');
  try {
    const oldBrands = await oldDb.select().from(brands);
    console.log(`Found ${oldBrands.length} brands to migrate`);
    
    for (const brand of oldBrands) {
      await newDb.insert(brands).values({
        id: brand.id,
        name: brand.name,
        identifier: brand.identifier,
        ownerId: brand.ownerId,
        createdAt: brand.createdAt,
      }).onConflictDoNothing();
    }
    console.log('✅ Brands migration completed');
  } catch (error) {
    console.error('❌ Error migrating brands:', error);
  }
}

async function migrateHorses() {
  console.log('Migrating Horses...');
  try {
    const oldHorses = await oldDb.select().from(horses);
    console.log(`Found ${oldHorses.length} horses to migrate`);
    
    for (const horse of oldHorses) {
      await newDb.insert(horses).values({
        id: horse.id,
        name: horse.name,
        ownerId: horse.ownerId,
        stable: horse.stable,
        brandId: horse.brandId,
        breeds: horse.breeds,
        components: horse.components,
        model: horse.model,
        gender: horse.gender,
        age: horse.age,
        weight: horse.weight,
        food: horse.food,
        water: horse.water,
        health: horse.health,
        cleanliness: horse.cleanliness,
        neuteredFixed: horse.neuteredFixed,
        statOffRoad: horse.statOffRoad,
        statHealth: horse.statHealth,
        statEndurance: horse.statEndurance,
        statFertility: horse.statFertility,
        statHandling: horse.statHandling,
        statSpeed: horse.statSpeed,
        statAcceleration: horse.statAcceleration,
        statBonding: horse.statBonding,
        hooves: horse.hooves,
        horseshoes: horse.horseshoes,
        metadata: horse.metadata,
        lastX: horse.lastX,
        lastY: horse.lastY,
        lastZ: horse.lastZ,
        createdAt: horse.createdAt,
      }).onConflictDoNothing();
    }
    console.log('✅ Horses migration completed');
  } catch (error) {
    console.error('❌ Error migrating horses:', error);
  }
}

async function migrateLivestock() {
  console.log('Migrating Livestock...');
  try {
    const oldLivestock = await oldDb.select().from(livestock);
    console.log(`Found ${oldLivestock.length} livestock to migrate`);
    
    for (const animal of oldLivestock) {
      await newDb.insert(livestock).values({
        id: animal.id,
        name: animal.name,
        ownerId: animal.ownerId,
        model: animal.model,
        brandId: animal.brandId,
        lastX: animal.lastX,
        lastY: animal.lastY,
        lastZ: animal.lastZ,
      }).onConflictDoNothing();
    }
    console.log('✅ Livestock migration completed');
  } catch (error) {
    console.error('❌ Error migrating livestock:', error);
  }
}

async function migrateContainers() {
  console.log('Migrating Containers...');
  try {
    const oldContainers = await oldDb.select().from(container);
    console.log(`Found ${oldContainers.length} containers to migrate`);
    
    for (const cont of oldContainers) {
      await newDb.insert(container).values({
        id: cont.id,
        locked: cont.locked,
        sealed: cont.sealed,
      }).onConflictDoNothing();
    }
    console.log('✅ Containers migration completed');
  } catch (error) {
    console.error('❌ Error migrating containers:', error);
  }
}

async function migrateInventories() {
  console.log('Migrating Inventories...');
  try {
    const oldInventories = await oldDb.select().from(inventory);
    console.log(`Found ${oldInventories.length} inventories to migrate`);
    
    for (const inv of oldInventories) {
      await newDb.insert(inventory).values({
        id: inv.id,
        identifier: inv.identifier,
        metadata: inv.metadata,
        containerId: inv.containerId,
      }).onConflictDoNothing();
    }
    console.log('✅ Inventories migration completed');
  } catch (error) {
    console.error('❌ Error migrating inventories:', error);
  }
}

async function migrateItems() {
  console.log('Migrating Items...');
  try {
    const oldItems = await oldDb.select().from(item);
    console.log(`Found ${oldItems.length} items to migrate`);
    
    for (const itm of oldItems) {
      await newDb.insert(item).values({
        id: itm.id,
        metadata: itm.metadata,
        containerId: itm.containerId,
        createdAt: itm.createdAt,
        deletedAt: itm.deletedAt,
        identifier: itm.identifier,
        slot: itm.slot,
        durability: itm.durability,
      }).onConflictDoNothing();
    }
    console.log('✅ Items migration completed');
  } catch (error) {
    console.error('❌ Error migrating items:', error);
  }
}

async function migrateDoors() {
  console.log('Migrating Doors...');
  try {
    const oldDoors = await oldDb.select().from(door);
    console.log(`Found ${oldDoors.length} doors to migrate`);
    
    for (const dr of oldDoors) {
      await newDb.insert(door).values({
        id: dr.id,
        hash: dr.hash,
        state: dr.state,
      }).onConflictDoNothing();
    }
    console.log('✅ Doors migration completed');
  } catch (error) {
    console.error('❌ Error migrating doors:', error);
  }
}

// Main migration function
async function runMigration() {
  console.log('🚀 Starting database migration...');
  console.log('📊 Old DB:', process.env.DATABASE_URL_OLD ? 'Connected' : 'Not configured');
  console.log('📊 New DB:', process.env.DATABASE_URL ? 'Connected' : 'Not configured');
  
  if (!process.env.DATABASE_URL_OLD || !process.env.DATABASE_URL) {
    console.error('❌ Please set DATABASE_URL_OLD and DATABASE_URL environment variables');
    process.exit(1);
  }

  try {
    // Test connections
    await oldPool.query('SELECT 1');
    await newPool.query('SELECT 1');
    console.log('✅ Database connections established');

    // Run migrations in dependency order
    await migrateAccounts();
    await migrateCharacters();
    await migrateFaces();
    await migrateOutfits();
    await migrateBrands();
    await migrateHorses();
    await migrateLivestock();
    await migrateContainers();
    await migrateInventories();
    await migrateItems();
    await migrateDoors();

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('💥 Migration failed:', error);
  } finally {
    await oldPool.end();
    await newPool.end();
    console.log('🔌 Database connections closed');
  }
}

// Run the migration immediately
runMigration().catch(console.error);
