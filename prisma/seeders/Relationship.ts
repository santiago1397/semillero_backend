import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const relationShipData: Prisma.RelationshipCreateInput[] = [
  { name: 'MADRE' },
  { name: 'PADRE' },
  { name: 'ABUELO' },
  { name: 'ABUELA' },
  { name: 'TIO' },
  { name: 'TIA' },
  { name: 'HERMANO' },
  { name: 'HERMANA' },
  { name: 'PRIMO' },
  { name: 'PRIMA' },
]

export default class RelationshipSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    await prisma.relationship.createMany({ data: relationShipData, skipDuplicates: true })
  }
}
