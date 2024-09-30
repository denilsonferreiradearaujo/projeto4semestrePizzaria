/*
  Warnings:

  - You are about to drop the column `tamanhoId` on the `valor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `valor` DROP FOREIGN KEY `Valor_tamanhoId_fkey`;

-- AlterTable
ALTER TABLE `valor` DROP COLUMN `tamanhoId`,
    ADD COLUMN `tamanho` BOOLEAN NOT NULL DEFAULT false;
