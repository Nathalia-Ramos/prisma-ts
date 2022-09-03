-- CreateTable
CREATE TABLE `tbl_aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `idade` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_aluno_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
