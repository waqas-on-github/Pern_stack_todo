/*
  Warnings:

  - Added the required column `trashId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "trashId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Trash" (
    "id" SERIAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Trash_id_key" ON "Trash"("id");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES "Trash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
