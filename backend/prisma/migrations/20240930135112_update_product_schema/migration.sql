/*
  Warnings:

  - You are about to drop the column `tamanho` on the `valor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `valor` DROP COLUMN `tamanho`,
    ADD COLUMN `tamanhoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Valor` ADD CONSTRAINT `Valor_tamanhoId_fkey` FOREIGN KEY (`tamanhoId`) REFERENCES `Tamanho`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
