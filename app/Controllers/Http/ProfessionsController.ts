import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Professions } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class ProfessionsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          name: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.professions.count({ where: filters }),
        prisma.professions.findMany({
          ...pagination,
          where: filters,
        }),
      ])

      return { total, data }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.DEFAULT })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.body() as Professions
    try {
      await prisma.professions.create({ data: { ...data } })
      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err)
      return response.status(500).json({ message: enumErrors.ERROR_CREATE })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const { id } = params
      const [data] = await prisma.$transaction([
        prisma.professions.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            name: true,
            createBy: true,
            updatedBy: true,
            version: true,
            parent: true,
            responsiblesEntes: true,
          },
        }),
      ])
      return { data }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_SELECT })
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const { id } = params
      const data = request.body()
      await prisma.professions.update({
        where: { id: Number(id) },
        data: data,
      })
      return { message: enumSuccess.UPDATE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_UPDATE })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const { id } = params
      await prisma.professions.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_DELETE })
    }
  }
}
