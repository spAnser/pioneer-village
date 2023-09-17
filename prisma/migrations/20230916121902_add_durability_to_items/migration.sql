-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "durability" INTEGER;
