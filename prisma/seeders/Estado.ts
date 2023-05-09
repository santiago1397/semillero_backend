import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const estadosData: Prisma.EstadosCreateInput[] = [
  {
    nombre: 'No definido',
  }
];

export default class EstadoSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Load estados on database
    await prisma.estados.createMany({ data: estadosData, skipDuplicates: true })
  }
}
