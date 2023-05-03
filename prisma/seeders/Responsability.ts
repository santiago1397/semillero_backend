import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client';

const responsabilitiesData: Prisma.ResponsabilitiesCreateInput[] = [
  { "name": "Comunicación y Disfusión"},
  { "name": "Rutas Científicas"},
  { "name": "Ciclo formativo"},
  { "name": "Enlace zona Educativa"},
  { "name": "Responsable ente"},
  { "name": "Responsable por Infocentro"}
]

export default class ResponsabilitySeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    await prisma.responsabilities.createMany({ data: responsabilitiesData, skipDuplicates: true });
  }
}
