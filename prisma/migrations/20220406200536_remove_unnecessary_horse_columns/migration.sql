/*
  Warnings:

  - You are about to drop the column `Stamina` on the `Horses` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `Horses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Horses" DROP COLUMN "Stamina",
DROP COLUMN "mood";
