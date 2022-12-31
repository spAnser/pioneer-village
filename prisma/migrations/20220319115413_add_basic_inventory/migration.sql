-- CreateEnum
CREATE TYPE "Sealed" AS ENUM ('NONE', 'SEALED', 'BROKEN');

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "containerId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" SERIAL NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "sealed" "Sealed" NOT NULL DEFAULT E'NONE',

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "containerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_identifier_key" ON "Inventory"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_containerId_key" ON "Inventory"("containerId");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
