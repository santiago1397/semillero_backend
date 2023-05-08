import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const modulesPerRolesData: Prisma.ModulesRolesCreateManyInput[] = [
  {
    roleId: 1,
    moduleId: 1,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 2,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 3,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 4,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 5,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 6,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 7,
    assignedBy: 0,
  },
]

export default class ModulesPerRoleSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    await prisma.modulesRoles.createMany({ data: modulesPerRolesData, skipDuplicates: true })
  }
}
