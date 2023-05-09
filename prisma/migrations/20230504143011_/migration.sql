-- CreateTable
CREATE TABLE "api_tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT,
    "token" TEXT NOT NULL,
    "type" TEXT,
    "created_at" TEXT,
    "expires_at" TEXT,

    CONSTRAINT "api_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rememberMeToken" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersProfiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identity" TEXT,
    "phone" TEXT,

    CONSTRAINT "UsersProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersRoles" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "enteId" INTEGER NOT NULL,
    "assignedBy" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Entes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acronim" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Entes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsabilities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Responsabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsiblesEntes" (
    "id" SERIAL NOT NULL,
    "enteId" INTEGER NOT NULL,
    "responsabilityId" INTEGER NOT NULL,
    "professionId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "gender" INTEGER NOT NULL,
    "birthDate" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "assignedBy" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ResponsiblesEntes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estados" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Estados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,

    CONSTRAINT "Municipios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parroquias" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "municipioId" INTEGER NOT NULL,

    CONSTRAINT "Parroquias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "typeSite" INTEGER NOT NULL DEFAULT 0,
    "pedagogicalObjective" TEXT,
    "activities" TEXT,
    "direction" TEXT,
    "parroquiaId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "biosecurity" BOOLEAN NOT NULL DEFAULT false,
    "bathrooms" BOOLEAN NOT NULL DEFAULT false,
    "parking" BOOLEAN NOT NULL DEFAULT false,
    "medicalService" BOOLEAN NOT NULL DEFAULT false,
    "diningRoom" BOOLEAN NOT NULL DEFAULT false,
    "socialNetworks" TEXT,
    "googleMapLink" TEXT,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeSites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TypeSites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagersSites" (
    "id" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "localPhone" TEXT,
    "email" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,
    "siteId" INTEGER NOT NULL,

    CONSTRAINT "ManagersSites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schools" (
    "id" SERIAL NOT NULL,
    "codPlantel" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "estadoId" INTEGER NOT NULL,
    "municipioId" INTEGER NOT NULL,
    "parroquiaId" INTEGER NOT NULL,
    "direction" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagersSchools" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identity" TEXT NOT NULL,
    "estadoId" INTEGER,
    "municipioId" INTEGER,
    "parroquiaId" INTEGER,
    "phone" TEXT NOT NULL,
    "localPhone" TEXT,
    "email" TEXT NOT NULL,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,
    "codPlantel" TEXT NOT NULL,

    CONSTRAINT "ManagersSchools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parents" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identity" TEXT,
    "birthDate" TEXT NOT NULL,
    "relationshipId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "localPhone" TEXT,
    "email" TEXT NOT NULL,
    "professionId" INTEGER NOT NULL,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "codPlantel" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identity" TEXT,
    "birthDate" TEXT NOT NULL,
    "gender" INTEGER NOT NULL DEFAULT 0,
    "gradeId" INTEGER NOT NULL,
    "sizeShirt" TEXT NOT NULL,
    "disability" TEXT NOT NULL DEFAULT 'NO',
    "direction" TEXT NOT NULL,
    "estadoId" INTEGER NOT NULL,
    "municipioId" INTEGER NOT NULL,
    "parroquiaId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "localPhone" TEXT,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutesPlanned" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "siteId" INTEGER NOT NULL,
    "codPlantel" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "datePlanned" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RoutesPlanned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modules" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "path" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" INTEGER NOT NULL DEFAULT 0,
    "updatedBy" INTEGER,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModulesRoles" (
    "moduleId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "assignedBy" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "api_tokens_token_key" ON "api_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsersProfiles_userId_key" ON "UsersProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UsersRoles_userId_roleId_enteId_key" ON "UsersRoles"("userId", "roleId", "enteId");

-- CreateIndex
CREATE UNIQUE INDEX "Entes_name_key" ON "Entes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Responsabilities_name_key" ON "Responsabilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Estados_nombre_key" ON "Estados"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Sites_name_key" ON "Sites"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TypeSites_name_key" ON "TypeSites"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ManagersSites_siteId_key" ON "ManagersSites"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "Schools_codPlantel_key" ON "Schools"("codPlantel");

-- CreateIndex
CREATE UNIQUE INDEX "ManagersSchools_codPlantel_key" ON "ManagersSchools"("codPlantel");

-- CreateIndex
CREATE UNIQUE INDEX "Relationship_name_key" ON "Relationship"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Professions_name_key" ON "Professions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Activities_name_key" ON "Activities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RoutesPlanned_name_key" ON "RoutesPlanned"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Modules_name_key" ON "Modules"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ModulesRoles_moduleId_roleId_key" ON "ModulesRoles"("moduleId", "roleId");

-- AddForeignKey
ALTER TABLE "UsersProfiles" ADD CONSTRAINT "UsersProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersRoles" ADD CONSTRAINT "UsersRoles_enteId_fkey" FOREIGN KEY ("enteId") REFERENCES "Entes"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsiblesEntes" ADD CONSTRAINT "ResponsiblesEntes_enteId_fkey" FOREIGN KEY ("enteId") REFERENCES "Entes"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsiblesEntes" ADD CONSTRAINT "ResponsiblesEntes_responsabilityId_fkey" FOREIGN KEY ("responsabilityId") REFERENCES "Responsabilities"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResponsiblesEntes" ADD CONSTRAINT "ResponsiblesEntes_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Professions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipios" ADD CONSTRAINT "Municipios_estadoId_fkey" FOREIGN KEY ("estadoId") REFERENCES "Estados"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parroquias" ADD CONSTRAINT "Parroquias_municipioId_fkey" FOREIGN KEY ("municipioId") REFERENCES "Municipios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sites" ADD CONSTRAINT "Sites_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeSites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagersSites" ADD CONSTRAINT "ManagersSites_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Sites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagersSchools" ADD CONSTRAINT "ManagersSchools_codPlantel_fkey" FOREIGN KEY ("codPlantel") REFERENCES "Schools"("codPlantel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "Relationship"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parents" ADD CONSTRAINT "Parents_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Professions"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesPlanned" ADD CONSTRAINT "RoutesPlanned_codPlantel_fkey" FOREIGN KEY ("codPlantel") REFERENCES "Schools"("codPlantel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesPlanned" ADD CONSTRAINT "RoutesPlanned_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulesRoles" ADD CONSTRAINT "ModulesRoles_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulesRoles" ADD CONSTRAINT "ModulesRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
