import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Roles } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class RolesController {
  public async index({}: HttpContextContract) {
    try {
      const [total, data] = await prisma.$transaction([
        prisma.roles.count(),
        prisma.roles.findMany({
          take: 10,
          skip: 0,
          select: {
            id: true,
            name: true,
            description: true,
            deleted: true,
            createBy: true,
            updatedBy: true,
            version: true,
            userRole: true,
            moduleRole: true,
          },
        }),
      ])

      return { total, data }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.DEFAULT }
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.body() as Roles
    try {
      await prisma.roles.create({ data: { ...data } })
      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err)
      return { message: enumErrors.ERROR_CREATE }
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const { id } = params
      const [data] = await prisma.$transaction([
        prisma.roles.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            name: true,
            description: true,
            deleted: true,
            createBy: true,
            updatedBy: true,
            version: true,
            userRole: true,
            moduleRole: true,
          },
        }),
      ])
      return { data }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_SELECT }
    }
  }

  public async update({ request, params }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      await prisma.roles.update({
        where: { id: Number(id) },
        data: data,
      })
      return { message: enumSuccess.UPDATE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_UPDATE }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const { id } = params
      await prisma.roles.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
