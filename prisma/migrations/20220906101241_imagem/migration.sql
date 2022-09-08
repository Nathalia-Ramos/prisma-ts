-- CreateTable
CREATE TABLE `Imagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `Imagem_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
