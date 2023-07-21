-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "currencies" JSONB NOT NULL DEFAULT '{"dollars": 20, "gold": 0}';
