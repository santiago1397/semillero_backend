import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const typesSitesData: Prisma.TypeSitesCreateInput[] = [
  { name: 'ECOLÓGICO' },
  { name: 'PRODUCCIÓN E INVESTIGACIÓN' },
  { name: 'INVESTIGACIÓN' },
  { name: 'FORMACIÓN' },
  { name: 'INVESTIGACIÓN Y PRODUCCIÓN' },
  { name: 'PRODUCCIÓN' },
]

export default class TypesSiteSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    await prisma.typeSites.createMany({ data: typesSitesData, skipDuplicates: true })
  }
}
