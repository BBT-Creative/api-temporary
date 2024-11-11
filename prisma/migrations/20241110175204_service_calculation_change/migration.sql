/*
  Warnings:

  - You are about to drop the column `form` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - You are about to drop the column `formIndonesian` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - You are about to drop the column `realTimeEstimatedPriceTextDesc` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - You are about to drop the column `realTimeEstimatedPriceTextDescIndonesian` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - You are about to drop the column `realTimeEstimatedResultTextDesc` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - You are about to drop the column `realTimeEstimatedResultTextDescIndonesian` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - Made the column `descriptionIndonesian` on table `ServiceDetailCalculation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `realTimeTitleIndonesian` on table `ServiceDetailCalculation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `realTimeDescriptionIndonesian` on table `ServiceDetailCalculation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `realTimeConsultablePriceIndonesian` on table `ServiceDetailCalculation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `realTimeTermsAndConditionApplyIndonesian` on table `ServiceDetailCalculation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ServiceDetailCalculation" DROP COLUMN "form",
DROP COLUMN "formIndonesian",
DROP COLUMN "realTimeEstimatedPriceTextDesc",
DROP COLUMN "realTimeEstimatedPriceTextDescIndonesian",
DROP COLUMN "realTimeEstimatedResultTextDesc",
DROP COLUMN "realTimeEstimatedResultTextDescIndonesian",
ADD COLUMN     "conditions" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "fields" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "formulas" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "results" JSONB NOT NULL DEFAULT '[]',
ALTER COLUMN "descriptionIndonesian" SET NOT NULL,
ALTER COLUMN "descriptionIndonesian" SET DEFAULT '',
ALTER COLUMN "realTimeTitleIndonesian" SET NOT NULL,
ALTER COLUMN "realTimeTitleIndonesian" SET DEFAULT '',
ALTER COLUMN "realTimeDescriptionIndonesian" SET NOT NULL,
ALTER COLUMN "realTimeDescriptionIndonesian" SET DEFAULT '',
ALTER COLUMN "realTimeConsultablePriceIndonesian" SET NOT NULL,
ALTER COLUMN "realTimeConsultablePriceIndonesian" SET DEFAULT '',
ALTER COLUMN "realTimeTermsAndConditionApplyIndonesian" SET NOT NULL,
ALTER COLUMN "realTimeTermsAndConditionApplyIndonesian" SET DEFAULT '';

-- CreateTable
CREATE TABLE "ServiceDetailCalculationOld" (
    "id" SERIAL NOT NULL,
    "title" JSONB NOT NULL DEFAULT '[]',
    "form" JSONB NOT NULL DEFAULT '{}',
    "description" TEXT NOT NULL,
    "realTimeTitle" TEXT NOT NULL,
    "realTimeDescription" TEXT NOT NULL,
    "realTimeEstimatedPriceTextDesc" TEXT NOT NULL,
    "realTimeEstimatedResultTextDesc" TEXT NOT NULL,
    "realTimeConsultablePrice" TEXT NOT NULL,
    "realTimeTermsAndConditionApply" TEXT NOT NULL,
    "titleIndonesian" JSONB NOT NULL DEFAULT '[]',
    "formIndonesian" JSONB NOT NULL DEFAULT '{}',
    "descriptionIndonesian" TEXT,
    "realTimeTitleIndonesian" TEXT,
    "realTimeDescriptionIndonesian" TEXT,
    "realTimeEstimatedPriceTextDescIndonesian" TEXT,
    "realTimeEstimatedResultTextDescIndonesian" TEXT,
    "realTimeConsultablePriceIndonesian" TEXT,
    "realTimeTermsAndConditionApplyIndonesian" TEXT,

    CONSTRAINT "ServiceDetailCalculationOld_pkey" PRIMARY KEY ("id")
);
