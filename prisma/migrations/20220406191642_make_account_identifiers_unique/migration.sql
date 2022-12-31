/*
  Warnings:

  - A unique constraint covering the columns `[identifier_steam]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier_fivem]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier_discord]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Accounts_identifier_steam_identifier_fivem_identifier_disco_key";

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_identifier_steam_key" ON "Accounts"("identifier_steam");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_identifier_fivem_key" ON "Accounts"("identifier_fivem");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_identifier_discord_key" ON "Accounts"("identifier_discord");
