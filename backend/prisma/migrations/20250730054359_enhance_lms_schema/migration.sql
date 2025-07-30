/*
  Warnings:

  - The `content` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,lessonId]` on the table `EmployeeProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,moduleId]` on the table `EmployeeProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `EmployeeProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ModuleCategory" AS ENUM ('WINE', 'SPIRITS', 'COCKTAILS', 'SERVICE', 'COMPLIANCE', 'GENERAL', 'FOOD_PAIRING', 'CUSTOMER_SERVICE');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('TEXT', 'VIDEO', 'INTERACTIVE', 'QUIZ', 'DOCUMENT', 'AUDIO', 'PRESENTATION');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'LOCKED');

-- DropForeignKey
ALTER TABLE "EmployeeProgress" DROP CONSTRAINT "EmployeeProgress_lessonId_fkey";

-- Step 1: Preserve existing lesson content in a temporary column
ALTER TABLE "Lesson" ADD COLUMN "old_content_backup" TEXT;
UPDATE "Lesson" SET "old_content_backup" = "content" WHERE "content" IS NOT NULL;

-- Step 2: AlterTable EmployeeProgress with proper defaults for existing data
ALTER TABLE "EmployeeProgress" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastAccessed" TIMESTAMP(3),
ADD COLUMN     "moduleId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "score" DOUBLE PRECISION,
ADD COLUMN     "status" "ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN     "timeSpent" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "lessonId" DROP NOT NULL;

-- Step 3: Update status based on existing completed field
UPDATE "EmployeeProgress" SET "status" = 'COMPLETED' WHERE "completed" = true;
UPDATE "EmployeeProgress" SET "status" = 'IN_PROGRESS' WHERE "completed" = false;

-- Step 4: AlterTable Lesson with proper handling of content and defaults
ALTER TABLE "Lesson" ADD COLUMN     "contentType" "ContentType" NOT NULL DEFAULT 'TEXT',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "orderIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "passingScore" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB;

-- Step 5: Migrate old content to new JSON format
UPDATE "Lesson" SET "content" = jsonb_build_object('text', "old_content_backup") 
WHERE "old_content_backup" IS NOT NULL AND "old_content_backup" != '';

-- Step 6: Clean up temporary column
ALTER TABLE "Lesson" DROP COLUMN "old_content_backup";

-- Step 7: AlterTable Module with proper defaults
ALTER TABLE "Module" ADD COLUMN     "category" "ModuleCategory" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "difficulty" "DifficultyLevel" NOT NULL DEFAULT 'BEGINNER',
ADD COLUMN     "estimatedDuration" INTEGER,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderIndex" INTEGER,
ADD COLUMN     "prerequisites" TEXT[],
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "LessonMedia" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "lessonId" TEXT,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "LessonMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "details" JSONB,
    "tableName" TEXT,
    "recordId" TEXT,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orgId" TEXT NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LessonMedia_lessonId_idx" ON "LessonMedia"("lessonId");

-- CreateIndex
CREATE INDEX "LessonMedia_orgId_mimeType_idx" ON "LessonMedia"("orgId", "mimeType");

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "AuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_orgId_action_idx" ON "AuditLog"("orgId", "action");

-- CreateIndex
CREATE INDEX "AuditLog_tableName_recordId_idx" ON "AuditLog"("tableName", "recordId");

-- CreateIndex
CREATE INDEX "EmployeeProgress_userId_status_idx" ON "EmployeeProgress"("userId", "status");

-- CreateIndex
CREATE INDEX "EmployeeProgress_moduleId_status_idx" ON "EmployeeProgress"("moduleId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProgress_userId_lessonId_key" ON "EmployeeProgress"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProgress_userId_moduleId_key" ON "EmployeeProgress"("userId", "moduleId");

-- CreateIndex
CREATE INDEX "Lesson_moduleId_orderIndex_idx" ON "Lesson"("moduleId", "orderIndex");

-- CreateIndex
CREATE INDEX "Lesson_orgId_isPublished_idx" ON "Lesson"("orgId", "isPublished");

-- CreateIndex
CREATE INDEX "Module_orgId_isPublished_idx" ON "Module"("orgId", "isPublished");

-- CreateIndex
CREATE INDEX "Module_category_difficulty_idx" ON "Module"("category", "difficulty");

-- AddForeignKey
ALTER TABLE "LessonMedia" ADD CONSTRAINT "LessonMedia_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonMedia" ADD CONSTRAINT "LessonMedia_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonMedia" ADD CONSTRAINT "LessonMedia_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeProgress" ADD CONSTRAINT "EmployeeProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeProgress" ADD CONSTRAINT "EmployeeProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
