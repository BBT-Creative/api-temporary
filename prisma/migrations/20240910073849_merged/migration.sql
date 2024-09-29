-- CreateEnum
CREATE TYPE "CaseStudyResultType" AS ENUM ('number', 'percentage');

-- CreateEnum
CREATE TYPE "ServiceTitleType" AS ENUM ('plain', 'styled');

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "titleIndonesian" TEXT,
    "descriptionIndonesian" TEXT,
    "poster" TEXT NOT NULL,
    "posterCaption" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "titleIndonesian" TEXT,
    "descriptionIndonesian" TEXT,
    "poster" TEXT NOT NULL,
    "posterCaption" TEXT NOT NULL,
    "serviceName" TEXT[],
    "serviceTags" TEXT[],
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStudyResult" (
    "id" SERIAL NOT NULL,
    "type" "CaseStudyResultType" NOT NULL DEFAULT 'number',
    "caseStudyId" INTEGER NOT NULL,
    "resultName" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "CaseStudyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "href" TEXT NOT NULL DEFAULT '',
    "videoPath" TEXT NOT NULL DEFAULT '',
    "titleIndonesian" TEXT,
    "descriptionIndonesian" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetail" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL DEFAULT '',
    "flagIconPath" TEXT NOT NULL,
    "flagTitle" TEXT NOT NULL,

    CONSTRAINT "ServiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetailTitle" (
    "id" SERIAL NOT NULL,
    "type" "ServiceTitleType" NOT NULL DEFAULT 'plain',
    "text" TEXT NOT NULL,
    "serviceDetailId" INTEGER,
    "serviceDetailIdIndonesian" INTEGER,

    CONSTRAINT "ServiceDetailTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetailContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "titleIndonesian" TEXT,
    "descriptionIndonesian" TEXT,

    CONSTRAINT "ServiceDetailContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetailContentItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT[],
    "description" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "titleIndonesian" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "descriptionIndonesian" TEXT,

    CONSTRAINT "ServiceDetailContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceDetailCalculation" (
    "id" SERIAL NOT NULL,
    "title" "ServiceTitleType"[] DEFAULT ARRAY[]::"ServiceTitleType"[],
    "form" JSONB NOT NULL DEFAULT '{}',
    "description" TEXT NOT NULL,
    "realTimeTitle" TEXT NOT NULL,
    "realTimeDescription" TEXT NOT NULL,
    "realTimeEstimatedPriceTextDesc" TEXT NOT NULL,
    "realTimeEstimatedResultTextDesc" TEXT NOT NULL,
    "realTimeConsultablePrice" TEXT NOT NULL,
    "realTimeTermsAndConditionApply" TEXT NOT NULL,
    "titleId" "ServiceTitleType"[] DEFAULT ARRAY[]::"ServiceTitleType"[],
    "formIndonesian" JSONB NOT NULL DEFAULT '{}',
    "descriptionIndonesian" TEXT,
    "realTimeTitleIndonesian" TEXT,
    "realTimeDescriptionIndonesian" TEXT,
    "realTimeEstimatedPriceTextDescIndonesian" TEXT,
    "realTimeEstimatedResultTextDescIndonesian" TEXT,
    "realTimeConsultablePriceIndonesian" TEXT,
    "realTimeTermsAndConditionApplyIndonesian" TEXT,
    "serviceDetailId" INTEGER NOT NULL,

    CONSTRAINT "ServiceDetailCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePlatform" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ServicePlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMonthCollaboration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ServiceMonthCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestCalculation" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "dataCalculation" JSONB NOT NULL,

    CONSTRAINT "RequestCalculation_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "ServiceDetail_serviceId_key" ON "ServiceDetail"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceDetailCalculation_serviceDetailId_key" ON "ServiceDetailCalculation"("serviceDetailId");

-- AddForeignKey
ALTER TABLE "CaseStudyResult" ADD CONSTRAINT "CaseStudyResult_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetail" ADD CONSTRAINT "ServiceDetail_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetailTitle" ADD CONSTRAINT "serviceDetail_fkey" FOREIGN KEY ("serviceDetailId") REFERENCES "ServiceDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetailTitle" ADD CONSTRAINT "serviceDetailIndonesian_fkey" FOREIGN KEY ("serviceDetailIdIndonesian") REFERENCES "ServiceDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetailCalculation" ADD CONSTRAINT "ServiceDetailCalculation_serviceDetailId_fkey" FOREIGN KEY ("serviceDetailId") REFERENCES "ServiceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "CaseStudyResult" DROP CONSTRAINT "CaseStudyResult_caseStudyId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceDetail" DROP CONSTRAINT "ServiceDetail_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceDetailTitle" DROP CONSTRAINT "serviceDetailIndonesian_fkey";

-- DropForeignKey
ALTER TABLE "ServiceDetailTitle" DROP CONSTRAINT "serviceDetail_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "CaseStudy" DROP COLUMN "category",
ADD COLUMN     "featuredHome" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "InsightCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InsightCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeWhoWeAre" (
    "id" SERIAL NOT NULL,
    "introTitle" TEXT NOT NULL,
    "introVideoPath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "introTitleIndonesian" TEXT,
    "descriptionIndonesian" TEXT,

    CONSTRAINT "HomeWhoWeAre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeClient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logoPath" TEXT NOT NULL,

    CONSTRAINT "HomeClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeFaq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "questionIndonesian" TEXT,
    "answerIndonesian" TEXT,

    CONSTRAINT "HomeFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlogToInsightCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseStudyToInsightCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogToInsightCategory_AB_unique" ON "_BlogToInsightCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogToInsightCategory_B_index" ON "_BlogToInsightCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseStudyToInsightCategory_AB_unique" ON "_CaseStudyToInsightCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseStudyToInsightCategory_B_index" ON "_CaseStudyToInsightCategory"("B");

-- AddForeignKey
ALTER TABLE "CaseStudyResult" ADD CONSTRAINT "CaseStudyResult_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetail" ADD CONSTRAINT "ServiceDetail_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetailTitle" ADD CONSTRAINT "serviceDetail_fkey" FOREIGN KEY ("serviceDetailId") REFERENCES "ServiceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceDetailTitle" ADD CONSTRAINT "serviceDetailIndonesian_fkey" FOREIGN KEY ("serviceDetailIdIndonesian") REFERENCES "ServiceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToInsightCategory" ADD CONSTRAINT "_BlogToInsightCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogToInsightCategory" ADD CONSTRAINT "_BlogToInsightCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "InsightCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseStudyToInsightCategory" ADD CONSTRAINT "_CaseStudyToInsightCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseStudy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseStudyToInsightCategory" ADD CONSTRAINT "_CaseStudyToInsightCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "InsightCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

