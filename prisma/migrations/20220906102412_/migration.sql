/*
  Warnings:

  - You are about to drop the `Imagem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Imagem`;

-- CreateTable
CREATE TABLE `tbl_imagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `tbl_imagem_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
