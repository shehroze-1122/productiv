/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,id]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_ownerId_id_key" ON "Task"("ownerId", "id");
