-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "whistle" JSONB NOT NULL DEFAULT '{"pitch":0.5,"shape":5,"clarity":0.5}';
