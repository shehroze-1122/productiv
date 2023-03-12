/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,due]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_ownerId_due_key" ON "Task"("ownerId", "due");
