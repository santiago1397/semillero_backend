import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

const modulesData: Prisma.ModulesCreateInput[] = [
  {
    name: 'Entes',
    path: '/dashboard/entes',
  },
  {
    name: 'Sitios',
    path: '/dashboard/sitios',
  },
  {
    name: 'Instituciones',
    path: '/dashboard/instituciones',
  },
  {
    name: 'Usuarios',
    path: '/dashboard/usuarios',
  },
  {
    name: 'Perfil',
    path: '/dashboard/perfil',
  },
  {
    name: 'Roles',
    path: '/dashboard/roles',
  },
  {
    name: 'Actividades',
    path: '/dashboard/actividades',
  },
]

export default class ModuleSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Load roles on database
    await prisma.modules.createMany({ data: modulesData, skipDuplicates: true })
  }
}
