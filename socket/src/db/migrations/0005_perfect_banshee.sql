CREATE TYPE "public"."BankTxType" AS ENUM('DEPOSIT', 'WITHDRAWAL', 'WIRE_OUT', 'WIRE_IN', 'WIRE_FEE', 'INTEREST', 'LOAN_CREDIT', 'LOAN_REPAYMENT', 'LOAN_INTEREST', 'SAFETY_BOX_FEE', 'ROBBERY_LOSS', 'MINERAL_SALE');--> statement-breakpoint
CREATE TYPE "public"."LoanStatus" AS ENUM('ACTIVE', 'DEFAULTED', 'REPAID');--> statement-breakpoint
CREATE TYPE "public"."TransferStatus" AS ENUM('PENDING', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "BankAccounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"characterId" integer NOT NULL,
	"bankId" varchar NOT NULL,
	"balance" numeric DEFAULT '0.00' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "BankLoans" (
	"id" serial PRIMARY KEY NOT NULL,
	"characterId" integer NOT NULL,
	"bankId" varchar NOT NULL,
	"principal" numeric NOT NULL,
	"outstanding" numeric NOT NULL,
	"collateralItemId" integer,
	"issuedAt" timestamp DEFAULT now(),
	"dueAt" timestamp NOT NULL,
	"missedPayments" smallint DEFAULT 0 NOT NULL,
	"status" "LoanStatus" DEFAULT 'ACTIVE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BankMineralBudgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"bankId" varchar NOT NULL,
	"dailyLimit" numeric NOT NULL,
	"spentToday" numeric DEFAULT '0.00' NOT NULL,
	"priceMultiplier" numeric DEFAULT '1.00' NOT NULL,
	"resetAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "BankSafetyBoxes" (
	"id" serial PRIMARY KEY NOT NULL,
	"characterId" integer NOT NULL,
	"bankId" varchar NOT NULL,
	"inventoryId" integer,
	"rentedAt" timestamp DEFAULT now(),
	"nextDueAt" timestamp NOT NULL,
	"weeklyFee" numeric DEFAULT '10.00' NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BankTransactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"characterId" integer NOT NULL,
	"bankId" varchar NOT NULL,
	"type" "BankTxType" NOT NULL,
	"amount" numeric NOT NULL,
	"balanceAfter" numeric NOT NULL,
	"relatedId" integer,
	"note" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BankTransfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"fromCharacterId" integer NOT NULL,
	"toCharacterId" integer NOT NULL,
	"fromBankId" varchar NOT NULL,
	"toBankId" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"fee" numeric NOT NULL,
	"status" "TransferStatus" DEFAULT 'PENDING' NOT NULL,
	"scheduledAt" timestamp NOT NULL,
	"completedAt" timestamp,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "BankVaults" (
	"id" serial PRIMARY KEY NOT NULL,
	"bankId" varchar NOT NULL,
	"vaultBalance" numeric DEFAULT '0.00' NOT NULL,
	"lastRobbedAt" timestamp,
	"robberyCount" integer DEFAULT 0 NOT NULL,
	"reputationScore" smallint DEFAULT 100 NOT NULL,
	"updatedAt" timestamp,
	CONSTRAINT "BankVaults_bankId_unique" UNIQUE("bankId")
);
--> statement-breakpoint
ALTER TABLE "JobPaySlips" ADD COLUMN "bankId" varchar DEFAULT '' NOT NULL;