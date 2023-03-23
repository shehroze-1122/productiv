/*
  Warnings:

  - You are about to drop the column `deleted` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "deleted";
