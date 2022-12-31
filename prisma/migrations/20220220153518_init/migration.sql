-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'DEVELOPER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 10,
    "identifier_steam" TEXT NOT NULL,
    "identifier_fivem" TEXT,
    "identifier_discord" TEXT,
    "identifier_ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bannedAt" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "lastX" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "lastY" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "lastZ" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "components" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faces" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "noseHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "lowerLipWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "upperLipHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "earlobeSize" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "lowerLipHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyebrowHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "jawHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyesDistance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "mouthDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "mouthWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "noseCurvature" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyebrowDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "earsHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "noseSize" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "headWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyelidWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "mouthYPos" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "earsWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "jawWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "nostrilsDistance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "noseWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyesHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "chinHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "upperLipWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyebrowWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "cheekBoneWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "chinWidth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyesAngle" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "earsAngle" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "jawDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyelidHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "cheekBoneHeight" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "chinDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "cheekBoneDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "upperLipDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "noseAngle" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "mouthXPos" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "lowerLipDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "eyesDepth" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "overlays" JSONB,

    CONSTRAINT "Faces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outfits" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "components" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Outfits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "stable" TEXT NOT NULL,
    "brandId" INTEGER,
    "breeds" JSONB NOT NULL,
    "components" JSONB NOT NULL DEFAULT '[]',
    "model" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "food" DECIMAL(65,30) NOT NULL DEFAULT 100.0,
    "water" DECIMAL(65,30) NOT NULL DEFAULT 100.0,
    "health" DECIMAL(65,30) NOT NULL DEFAULT 100.0,
    "Stamina" DECIMAL(65,30) NOT NULL DEFAULT 100.0,
    "mood" DECIMAL(65,30) NOT NULL,
    "cleanliness" DECIMAL(65,30) NOT NULL DEFAULT 100.0,
    "neuteredFixed" BOOLEAN NOT NULL DEFAULT false,
    "statOffRoad" INTEGER NOT NULL,
    "statHealth" INTEGER NOT NULL,
    "statEndurance" INTEGER NOT NULL,
    "statFertility" INTEGER NOT NULL,
    "statHandling" INTEGER NOT NULL,
    "statSpeed" INTEGER NOT NULL,
    "statAcceleration" INTEGER NOT NULL,
    "statBonding" JSONB,
    "hooves" DECIMAL(65,30) NOT NULL,
    "horseshoes" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "metadata" JSONB,
    "lastX" DECIMAL(65,30) NOT NULL,
    "lastY" DECIMAL(65,30) NOT NULL,
    "lastZ" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Horses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livestock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "model" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "lastX" DECIMAL(65,30) NOT NULL,
    "lastY" DECIMAL(65,30) NOT NULL,
    "lastZ" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Livestock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_identifier_steam_identifier_fivem_identifier_disco_key" ON "Accounts"("identifier_steam", "identifier_fivem", "identifier_discord");

-- CreateIndex
CREATE UNIQUE INDEX "Faces_characterId_key" ON "Faces"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Livestock_ownerId_key" ON "Livestock"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Brands_ownerId_key" ON "Brands"("ownerId");

-- AddForeignKey
ALTER TABLE "Characters" ADD CONSTRAINT "Characters_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faces" ADD CONSTRAINT "Faces_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outfits" ADD CONSTRAINT "Outfits_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horses" ADD CONSTRAINT "Horses_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horses" ADD CONSTRAINT "Horses_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livestock" ADD CONSTRAINT "Livestock_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livestock" ADD CONSTRAINT "Livestock_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brands" ADD CONSTRAINT "Brands_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
