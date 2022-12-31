-- CreateTable
CREATE TABLE "Door" (
    "id" SERIAL NOT NULL,
    "hash" INTEGER NOT NULL,
    "state" SMALLINT NOT NULL DEFAULT -1,

    CONSTRAINT "Door_pkey" PRIMARY KEY ("id")
);
