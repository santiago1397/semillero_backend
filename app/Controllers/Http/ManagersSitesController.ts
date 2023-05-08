import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { ManagersSites } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class ManagersSitesController {
  public async index({}: HttpContextContract) {
    try {
      const [total, data] = await prisma.$transaction([
        prisma.managersSites.count(),
        prisma.managersSites.findMany({
          take: 10,
          skip: 0,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identity: true,
            birthdate: true,
            position: true,
            phone: true,
            localPhone: true,
            email: true,
            profession: true,
            createBy: true,
            updatedBy: true,
            version: true,
            siteId: true,
            site: {
              select: {
                name: true,
              },
            },
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
    const data = request.body() as ManagersSites
    try {
      await prisma.managersSites.create({ data: { ...data } })
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
        prisma.managersSites.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identity: true,
            birthdate: true,
            position: true,
            phone: true,
            localPhone: true,
            email: true,
            profession: true,
            createBy: true,
            updatedBy: true,
            version: true,
            siteId: true,
            site: {
              select: {
                name: true,
              },
            },
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
      await prisma.managersSites.update({
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
      await prisma.managersSites.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
