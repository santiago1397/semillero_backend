import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { ManagersSites } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ManagersSitesController {
  public async index({ request }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          lastName: schema.string.optional(),
          firstName: schema.string.optional(),
          identity: schema.string.optional(),
          birthdate: schema.string.optional(),
          position: schema.string.optional(),
          phone: schema.string.optional(),
          localPhone: schema.string.optional(),
          email: schema.string.optional(),
          profession: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.managersSites.count({ where: filters }),
        prisma.managersSites.findMany({
          ...pagination,
          where: filters,
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
