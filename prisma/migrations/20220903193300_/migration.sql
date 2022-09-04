/*
  Warnings:

  - Added the required column `idCidade` to the `tbl_escola` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_escola` ADD COLUMN `idCidade` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `tbl_escola` ADD CONSTRAINT `tbl_escola_idCidade_fkey` FOREIGN KEY (`idCidade`) REFERENCES `tbl_cidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
