ALTER TYPE "public"."BankTxType" ADD VALUE 'MINERAL_SALE';--> statement-breakpoint
CREATE TABLE "BankMineralBudgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"bankId" varchar NOT NULL,
	"dailyLimit" numeric NOT NULL,
	"spentToday" numeric DEFAULT '0.00' NOT NULL,
	"priceMultiplier" numeric DEFAULT '1.00' NOT NULL,
	"resetAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
