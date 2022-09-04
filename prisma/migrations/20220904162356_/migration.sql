/*
  Warnings:

  - You are about to drop the column `idCidade` on the `tbl_escola` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_escola` DROP FOREIGN KEY `tbl_escola_idCidade_fkey`;

-- AlterTable
ALTER TABLE `tbl_escola` DROP COLUMN `idCidade`;
