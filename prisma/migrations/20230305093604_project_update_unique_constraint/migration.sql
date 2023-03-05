/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,id]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Project_ownerId_id_idx";

-- DropIndex
DROP INDEX "Project_ownerId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Project_ownerId_id_key" ON "Project"("ownerId", "id");
