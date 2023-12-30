-- CreateTable
CREATE TABLE `stream` (
    `id` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `thumnailUrl` TEXT NULL,
    `ingressId` VARCHAR(191) NOT NULL,
    `serverUrl` TEXT NOT NULL,
    `streamKet` TEXT NOT NULL,
    `isLive` BOOLEAN NOT NULL DEFAULT false,
    `isChatEnabled` BOOLEAN NOT NULL DEFAULT true,
    `isChatDelayed` BOOLEAN NOT NULL DEFAULT false,
    `isChatFollowersOnly` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stream_id_key`(`id`),
    UNIQUE INDEX `stream_ingressId_key`(`ingressId`),
    UNIQUE INDEX `stream_userId_key`(`userId`),
    INDEX `stream_userId_idx`(`userId`),
    INDEX `stream_ingressId_idx`(`ingressId`),
    FULLTEXT INDEX `stream_name_idx`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
