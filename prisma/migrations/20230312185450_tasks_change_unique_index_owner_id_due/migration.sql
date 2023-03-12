-- DropIndex
DROP INDEX "Task_ownerId_due_key";

-- CreateIndex
CREATE INDEX "Task_ownerId_due_idx" ON "Task"("ownerId", "due");
