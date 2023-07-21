-- AlterTable
ALTER TABLE "Characters" ADD COLUMN     "healthMetadata" JSONB NOT NULL DEFAULT '{"health": 100, "stamina": 100, "litersOfBlood": 5, "boneHealth": "[]", "activeTonic": false, "sick": false, "boneStatus": "[]"}';
