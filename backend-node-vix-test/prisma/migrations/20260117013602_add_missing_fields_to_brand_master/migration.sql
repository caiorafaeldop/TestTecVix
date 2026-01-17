-- AlterTable
ALTER TABLE `brandMaster` ADD COLUMN `discountRate` DOUBLE NULL,
    ADD COLUMN `hasPrepaid` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `hasSelfRegister` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `idBrandTheme` INTEGER NULL,
    ADD COLUMN `isStripeActive` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `minConsumption` DOUBLE NULL,
    ADD COLUMN `retailPercentageDefault` DOUBLE NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `userPhoneNumber` VARCHAR(191) NULL;
