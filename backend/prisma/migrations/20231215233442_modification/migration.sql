-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_trashId_fkey";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "trashId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_trashId_fkey" FOREIGN KEY ("trashId") REFERENCES "Trash"("id") ON DELETE SET NULL ON UPDATE CASCADE;
