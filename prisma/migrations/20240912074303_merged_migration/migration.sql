-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- CreateEnum
CREATE TYPE "InsightType" AS ENUM ('blog', 'caseStudy');

-- DropForeignKey
ALTER TABLE "CaseStudyResult" DROP CONSTRAINT "CaseStudyResult_caseStudyId_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToInsightCategory" DROP CONSTRAINT "_BlogToInsightCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToInsightCategory" DROP CONSTRAINT "_BlogToInsightCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_CaseStudyToInsightCategory" DROP CONSTRAINT "_CaseStudyToInsightCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseStudyToInsightCategory" DROP CONSTRAINT "_CaseStudyToInsightCategory_B_fkey";

-- AlterTable
ALTER TABLE "CaseStudyResult" DROP COLUMN "caseStudyId",
ADD COLUMN     "insightId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "CaseStudy";

-- DropTable
DROP TABLE "_BlogToInsightCategory";

-- DropTable
DROP TABLE "_CaseStudyToInsightCategory";

-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "type" "InsightType" NOT NULL DEFAULT 'blog',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "titleIndonesian" TEXT,
    "descriptionIndonesian" TEXT,
    "poster" TEXT NOT NULL,
    "posterCaption" TEXT NOT NULL,
    "serviceName" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "serviceTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InsightToInsightCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CaseStudyResultToInsight" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InsightToInsightCategory_AB_unique" ON "_InsightToInsightCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_InsightToInsightCategory_B_index" ON "_InsightToInsightCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CaseStudyResultToInsight_AB_unique" ON "_CaseStudyResultToInsight"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseStudyResultToInsight_B_index" ON "_CaseStudyResultToInsight"("B");

-- AddForeignKey
ALTER TABLE "_InsightToInsightCategory" ADD CONSTRAINT "_InsightToInsightCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Insight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InsightToInsightCategory" ADD CONSTRAINT "_InsightToInsightCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "InsightCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseStudyResultToInsight" ADD CONSTRAINT "_CaseStudyResultToInsight_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseStudyResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseStudyResultToInsight" ADD CONSTRAINT "_CaseStudyResultToInsight_B_fkey" FOREIGN KEY ("B") REFERENCES "Insight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "AppMenuBranch" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "addressPhone" TEXT NOT NULL,
    "mapLink" TEXT NOT NULL,

    CONSTRAINT "AppMenuBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ServiceDetailToServiceDetailContent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ServiceDetailContentToServiceDetailContentItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceDetailToServiceDetailContent_AB_unique" ON "_ServiceDetailToServiceDetailContent"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceDetailToServiceDetailContent_B_index" ON "_ServiceDetailToServiceDetailContent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceDetailContentToServiceDetailContentItem_AB_unique" ON "_ServiceDetailContentToServiceDetailContentItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceDetailContentToServiceDetailContentItem_B_index" ON "_ServiceDetailContentToServiceDetailContentItem"("B");

-- AddForeignKey
ALTER TABLE "_ServiceDetailToServiceDetailContent" ADD CONSTRAINT "_ServiceDetailToServiceDetailContent_A_fkey" FOREIGN KEY ("A") REFERENCES "ServiceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceDetailToServiceDetailContent" ADD CONSTRAINT "_ServiceDetailToServiceDetailContent_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceDetailContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceDetailContentToServiceDetailContentItem" ADD CONSTRAINT "_ServiceDetailContentToServiceDetailContentItem_A_fkey" FOREIGN KEY ("A") REFERENCES "ServiceDetailContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceDetailContentToServiceDetailContentItem" ADD CONSTRAINT "_ServiceDetailContentToServiceDetailContentItem_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceDetailContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "ServiceDetailCalculation" DROP COLUMN "titleId",
ADD COLUMN     "titleIndonesian" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "title",
ADD COLUMN     "title" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "ServiceDetailContentItem" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "href",
ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- DropForeignKey
ALTER TABLE "ServiceDetailTitle" DROP CONSTRAINT "serviceDetailIndonesian_fkey";

-- AlterTable
ALTER TABLE "ServiceDetailTitle" DROP COLUMN "serviceDetailIdIndonesian";

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "descriptionIndonesian",
DROP COLUMN "titleIndonesian",
ALTER COLUMN "posterCaption" DROP NOT NULL;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "poster",
ADD COLUMN     "posterPath" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Insight" ALTER COLUMN "createdDate" SET DEFAULT CURRENT_TIMESTAMP;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "CaseStudyResult" DROP COLUMN "insightId";

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- CreateEnum
CREATE TYPE "HomeMainVideoType" AS ENUM ('mov', 'mp4');

-- AlterTable
ALTER TABLE "AppMenuBranch" ADD COLUMN     "mainWebSSRId" INTEGER;

-- AlterTable
ALTER TABLE "HomeClient" ADD COLUMN     "mainWebSSRId" INTEGER;

-- AlterTable
ALTER TABLE "HomeFaq" ADD COLUMN     "mainWebSSRId" INTEGER;

-- AlterTable
ALTER TABLE "HomeWhoWeAre" ADD COLUMN     "mainWebSSRId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ServiceMonthCollaboration" ADD COLUMN     "mainWebSSRId" INTEGER;

-- AlterTable
ALTER TABLE "ServicePlatform" ADD COLUMN     "mainWebSSRId" INTEGER;

-- CreateTable
CREATE TABLE "MainWebSSR" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "MainWebSSR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeMainVideo" (
    "id" SERIAL NOT NULL,
    "videoPath" TEXT NOT NULL,
    "type" "HomeMainVideoType" NOT NULL,
    "mainWebSSRId" INTEGER NOT NULL,

    CONSTRAINT "HomeMainVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeMainVideo_mainWebSSRId_key" ON "HomeMainVideo"("mainWebSSRId");

-- CreateIndex
CREATE UNIQUE INDEX "HomeWhoWeAre_mainWebSSRId_key" ON "HomeWhoWeAre"("mainWebSSRId");

-- AddForeignKey
ALTER TABLE "HomeWhoWeAre" ADD CONSTRAINT "HomeWhoWeAre_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeClient" ADD CONSTRAINT "HomeClient_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeFaq" ADD CONSTRAINT "HomeFaq_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppMenuBranch" ADD CONSTRAINT "AppMenuBranch_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeMainVideo" ADD CONSTRAINT "HomeMainVideo_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServicePlatform" ADD CONSTRAINT "ServicePlatform_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMonthCollaboration" ADD CONSTRAINT "ServiceMonthCollaboration_mainWebSSRId_fkey" FOREIGN KEY ("mainWebSSRId") REFERENCES "MainWebSSR"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "FileStorageType" AS ENUM ('video', 'image', 'document');

-- CreateTable
CREATE TABLE "FileStorage" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "type" "FileStorageType" NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "publicUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileStorage_pkey" PRIMARY KEY ("id")
);

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- DropForeignKey
ALTER TABLE "HomeWhoWeAre" DROP CONSTRAINT "HomeWhoWeAre_mainWebSSRId_fkey";

-- DropTable
DROP TABLE "HomeWhoWeAre";

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "HomeMainVideo" DROP COLUMN "videoPath",
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "videoPath",
ADD COLUMN     "videoUrl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ServiceDetail" DROP COLUMN "imagePath",
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ServiceDetailContentItem" DROP COLUMN "imagePath",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "ServiceMonthCollaboration" ADD COLUMN     "suffix" TEXT NOT NULL;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "HomeClient" DROP COLUMN "logoPath",
ADD COLUMN     "logoUrl" TEXT NOT NULL;


-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- DropForeignKey
ALTER TABLE "ServiceDetailTitle" DROP CONSTRAINT "serviceDetail_fkey";

-- AlterTable
ALTER TABLE "ServiceDetail" ADD COLUMN     "pageTitles" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "ServiceDetailCalculation" DROP COLUMN "titleIndonesian",
ADD COLUMN     "titleIndonesian" JSONB NOT NULL DEFAULT '[]',
DROP COLUMN "title",
ADD COLUMN     "title" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "ServiceDetailTitle";

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- DropForeignKey
ALTER TABLE "_ServiceDetailToServiceDetailContent" DROP CONSTRAINT "_ServiceDetailToServiceDetailContent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceDetailToServiceDetailContent" DROP CONSTRAINT "_ServiceDetailToServiceDetailContent_B_fkey";

-- AlterTable
ALTER TABLE "ServiceDetailContent" ADD COLUMN     "serviceDetailId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ServiceDetailToServiceDetailContent";

-- CreateIndex
CREATE UNIQUE INDEX "ServiceDetailContent_serviceDetailId_key" ON "ServiceDetailContent"("serviceDetailId");

-- AddForeignKey
ALTER TABLE "ServiceDetailContent" ADD CONSTRAINT "ServiceDetailContent_serviceDetailId_fkey" FOREIGN KEY ("serviceDetailId") REFERENCES "ServiceDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "description";

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- CreateIndex
CREATE UNIQUE INDEX "InsightCategory_name_key" ON "InsightCategory"("name");

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Insight" ADD COLUMN     "clientIndustry" TEXT,
ADD COLUMN     "clientName" TEXT,
ADD COLUMN     "yearCollabs" TEXT;

-- AlterTable
ALTER TABLE "Insight" ADD COLUMN     "clientLogoUrl" TEXT;
ALTER TABLE "Insight" ADD COLUMN     "clientImageUrl" TEXT;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "clientImageUrl";

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- AlterTable
ALTER TABLE "Insight" ADD COLUMN     "titleIndonesian" TEXT;

-- ************************************
-- ============== SQUASH ==============
-- ************************************

-- DropForeignKey
ALTER TABLE "_CaseStudyResultToInsight" DROP CONSTRAINT "_CaseStudyResultToInsight_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseStudyResultToInsight" DROP CONSTRAINT "_CaseStudyResultToInsight_B_fkey";

-- AlterTable
ALTER TABLE "Insight" DROP COLUMN "clientIndustry",
DROP COLUMN "clientLogoUrl",
DROP COLUMN "clientName",
DROP COLUMN "serviceName",
DROP COLUMN "serviceTags",
DROP COLUMN "titleIndonesian",
DROP COLUMN "yearCollabs";

-- DropTable
DROP TABLE "_CaseStudyResultToInsight";

-- CreateTable
CREATE TABLE "CaseStudy" (
    "insightId" INTEGER NOT NULL,
    "titleIndonesian" TEXT,
    "description" TEXT NOT NULL,
    "descriptionIndonesian" TEXT,
    "clientName" TEXT,
    "clientIndustry" TEXT,
    "clientLogoUrl" TEXT,
    "yearCollabs" TEXT,
    "serviceName" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "serviceTags" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("insightId")
);

-- CreateTable
CREATE TABLE "_CaseStudyToCaseStudyResult" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CaseStudyToCaseStudyResult_AB_unique" ON "_CaseStudyToCaseStudyResult"("A", "B");

-- CreateIndex
CREATE INDEX "_CaseStudyToCaseStudyResult_B_index" ON "_CaseStudyToCaseStudyResult"("B");

-- AddForeignKey
ALTER TABLE "CaseStudy" ADD CONSTRAINT "CaseStudy_insightId_fkey" FOREIGN KEY ("insightId") REFERENCES "Insight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseStudyToCaseStudyResult" ADD CONSTRAINT "_CaseStudyToCaseStudyResult_A_fkey" FOREIGN KEY ("A") REFERENCES "CaseStudy"("insightId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CaseStudyToCaseStudyResult" ADD CONSTRAINT "_CaseStudyToCaseStudyResult_B_fkey" FOREIGN KEY ("B") REFERENCES "CaseStudyResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ************************************
-- ============== SQUASH ==============
-- ************************************


-- ************************************************
-- ============== SQUASH DB SEQUENCE ==============
-- ============== KEEP IT AT BOTTOM! ==============
-- ************************************************

ALTER SEQUENCE "Insight_id_seq" RESTART WITH 1001;
ALTER SEQUENCE "InsightCategory_id_seq" RESTART WITH 101;
ALTER SEQUENCE "CaseStudyResult_id_seq" RESTART WITH 101;
ALTER SEQUENCE "Service_id_seq" RESTART WITH 1001;
ALTER SEQUENCE "ServiceDetail_id_seq" RESTART WITH 1001;
ALTER SEQUENCE "ServiceDetailContent_id_seq" RESTART WITH 101;
ALTER SEQUENCE "ServiceDetailContentItem_id_seq" RESTART WITH 101;
ALTER SEQUENCE "ServiceDetailCalculation_id_seq" RESTART WITH 101;
ALTER SEQUENCE "RequestCalculation_id_seq" RESTART WITH 1001;
ALTER SEQUENCE "MainWebSSR_id_seq" RESTART WITH 1001;
ALTER SEQUENCE "HomeClient_id_seq" RESTART WITH 101;
ALTER SEQUENCE "HomeFaq_id_seq" RESTART WITH 101;
ALTER SEQUENCE "AppMenuBranch_id_seq" RESTART WITH 101;
ALTER SEQUENCE "HomeMainVideo_id_seq" RESTART WITH 101;
ALTER SEQUENCE "ServicePlatform_id_seq" RESTART WITH 101;
ALTER SEQUENCE "ServiceMonthCollaboration_id_seq" RESTART WITH 101;
ALTER SEQUENCE "FileStorage_id_seq" RESTART WITH 1001;