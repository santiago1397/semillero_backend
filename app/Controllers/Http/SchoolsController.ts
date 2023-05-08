import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Schools } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class SchoolsController {
  public async index({ request }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          codPlantel: schema.string.optional(),
          name: schema.string.optional(),
          type: schema.number.optional(),
          estadoId: schema.number.optional(),
          municipioId: schema.number.optional(),
          parroquiaId: schema.number.optional(),
          direction: schema.string.optional(),
          phone: schema.string.optional(),
          totalStudents: schema.number.optional(),
          count: schema.number.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.schools.count(),
        prisma.schools.findMany({
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
    const data = request.body() as Schools
    try {
      await prisma.schools.create({ data: { ...data } })
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
        prisma.schools.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            codPlantel: true,
            name: true,
            type: true,
            estadoId: true,
            municipioId: true,
            parroquiaId: true,
            direction: true,
            phone: true,
            totalStudents: true,
            count: true,
            createBy: true,
            updatedBy: true,
            version: true,
            routes: true,
            manager: true,
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
      await prisma.schools.update({
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
      await prisma.schools.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
