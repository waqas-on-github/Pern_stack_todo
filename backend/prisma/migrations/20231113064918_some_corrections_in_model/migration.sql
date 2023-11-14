/*
  Warnings:

  - The values [Height] on the enum `Prerioty` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Prerioty_new" AS ENUM ('Low', 'Medium', 'High');
ALTER TABLE "Task" ALTER COLUMN "preriorty" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "preriorty" TYPE "Prerioty_new" USING ("preriorty"::text::"Prerioty_new");
ALTER TYPE "Prerioty" RENAME TO "Prerioty_old";
ALTER TYPE "Prerioty_new" RENAME TO "Prerioty";
DROP TYPE "Prerioty_old";
ALTER TABLE "Task" ALTER COLUMN "preriorty" SET DEFAULT 'Medium';
COMMIT;
