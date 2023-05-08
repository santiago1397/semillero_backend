import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const rolesData: Prisma.RolesCreateInput[] = [
  {
    name: 'ROOT',
    description: 'Rol para la administracion del sistema y su servidor',
  },
  {
    name: 'Administrador',
    description: 'Rol para la administracion del sistema',
  },
  {
    name: 'Presidente',
    description: 'Rol para la gestion del fundacite o ente adscrito estadal',
  },
  {
    name: 'Delegado',
    description: 'Rol asignado por el presidente del fundacite o del ente adscrito estadal',
  },
]

export default class RoleSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Load roles on database
    const role = await prisma.roles.createMany({ data: rolesData, skipDuplicates: true })
  }
}
