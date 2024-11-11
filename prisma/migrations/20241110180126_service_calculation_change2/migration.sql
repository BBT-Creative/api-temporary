/*
  Warnings:

  - You are about to drop the column `fields` on the `ServiceDetailCalculation` table. All the data in the column will be lost.
  - You are about to drop the column `results` on the `ServiceDetailCalculation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ServiceDetailCalculation" DROP COLUMN "fields",
DROP COLUMN "results",
ADD COLUMN     "form" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "formResults" JSONB NOT NULL DEFAULT '[]';
