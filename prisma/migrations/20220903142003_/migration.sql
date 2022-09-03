/*
  Warnings:

  - Added the required column `idEscola` to the `tbl_aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_aluno` ADD COLUMN `idEscola` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tbl_professores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `tbl_professores_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_escola` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `tbl_escola_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `sigla` VARCHAR(3) NOT NULL,
    `idEstado` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `sigla` VARCHAR(3) NOT NULL,

    UNIQUE INDEX `tbl_estado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_aluno` ADD CONSTRAINT `tbl_aluno_idEscola_fkey` FOREIGN KEY (`idEscola`) REFERENCES `tbl_escola`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cidade` ADD CONSTRAINT `tbl_cidade_idEstado_fkey` FOREIGN KEY (`idEstado`) REFERENCES `tbl_estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
