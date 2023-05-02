import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await prisma.users.findMany({
      take: 10,
      skip: 0,
      select: {
        id: true,
        email: true,
        createdBy: true,
        updatedBy: true,
        version: true,
        profile: {
          select: {
            firstName: true,
            lastName: true
          },
        },
        userRole: {
          select: {
            roleId: true,
            role: {
              select : {
                name: true
              }
            },
            enteId: true,
            ente: {
              select: {
                name: true
              }
            }
          }
        }
      },
    })
    return users;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
