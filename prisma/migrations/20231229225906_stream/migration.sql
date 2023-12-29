-- CreateTable
CREATE TABLE `block` (
    `id` VARCHAR(191) NOT NULL,
    `blockerId` VARCHAR(191) NOT NULL,
    `blockedId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `block_id_key`(`id`),
    INDEX `block_blockedId_idx`(`blockedId`),
    INDEX `block_blockerId_idx`(`blockerId`),
    UNIQUE INDEX `block_blockedId_blockerId_key`(`blockedId`, `blockerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
