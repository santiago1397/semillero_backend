/*
  Warnings:

  - You are about to drop the column `agreeParticipes` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `alergie` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `directionjobResponsible` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `typeBlood` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `vaccinatedCovid` on the `Students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roleId,enteId]` on the table `UsersRoles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Students" DROP COLUMN "agreeParticipes",
DROP COLUMN "alergie",
DROP COLUMN "birthDate",
DROP COLUMN "directionjobResponsible",
DROP COLUMN "typeBlood",
DROP COLUMN "vaccinatedCovid",
ADD COLUMN     "InChargeCharge" TEXT,
ADD COLUMN     "InChargeEmail" TEXT,
ADD COLUMN     "InChargeIdentity" TEXT,
ADD COLUMN     "InChargeLastName" TEXT,
ADD COLUMN     "InChargeLocalPhone" TEXT,
ADD COLUMN     "InChargeName" TEXT,
ADD COLUMN     "InChargePhone" TEXT,
ADD COLUMN     "InChargeProfession" TEXT,
ADD COLUMN     "activityDate" TIMESTAMP(3),
ADD COLUMN     "activityMade" TEXT,
ADD COLUMN     "activityPlace" TEXT,
ADD COLUMN     "entityInCharge" TEXT,
ADD COLUMN     "intitutionDirection" TEXT,
ADD COLUMN     "intitutionEstado" TEXT,
ADD COLUMN     "intitutionMunicipio" TEXT,
ADD COLUMN     "intitutionParroquia" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UsersRoles_roleId_enteId_key" ON "UsersRoles"("roleId", "enteId");
