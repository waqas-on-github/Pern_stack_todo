/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Trash` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Trash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trash" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trash_userId_key" ON "Trash"("userId");

-- AddForeignKey
ALTER TABLE "Trash" ADD CONSTRAINT "Trash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
