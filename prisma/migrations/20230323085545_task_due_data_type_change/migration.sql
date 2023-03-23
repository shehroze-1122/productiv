/*
  Warnings:

  - The `due` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "due",
ADD COLUMN     "due" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Task_ownerId_due_idx" ON "Task"("ownerId", "due");
