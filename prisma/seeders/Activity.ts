import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const activitiesData: Prisma.ActivitiesCreateInput[] = [
  { name: 'Rutas Cientificas' },
  { name: 'Plan de masificacion' },
  { name: 'Teatro cientifico' },
]

export default class ActivitySeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    await prisma.activities.createMany({ data: activitiesData, skipDuplicates: true })
  }
}
