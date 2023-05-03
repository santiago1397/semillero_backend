import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from "@prisma/client";

const professionsData : Prisma.ProfessionsCreateInput[] = [
  {
    name: 'No definido'
  }
]

export default class ProfessionSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    await prisma.professions.createMany({ data: professionsData, skipDuplicates: true });
  }
}
