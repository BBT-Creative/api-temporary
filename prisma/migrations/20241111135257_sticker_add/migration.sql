-- CreateTable
CREATE TABLE "Sticker" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sticker_pkey" PRIMARY KEY ("id")
);
