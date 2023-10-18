import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { ResponsiblesEntes } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ResponsiblesEntesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          enteId: schema.number.optional(),
          responsabilityId: schema.number.optional(),
          professionId: schema.number.optional(),
          firstName: schema.string.optional(),
          lastName: schema.string.optional(),
          identity: schema.string.optional(),
          gender: schema.number.optional(),
          birthDate: schema.string.optional(),
          email: schema.string.optional(),
          phone: schema.string.optional(),
          assignedBy: schema.number.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.responsiblesEntes.count({ where : filters}),
        prisma.responsiblesEntes.findMany({
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
    const data = request.body() as ResponsiblesEntes
    try {
      await prisma.responsiblesEntes.create({ data: { ...data } })
      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err)
      return response.status(500).json({ message: enumErrors.ERROR_CREATE })
    }
  }

  public async show({ request, params, response }: HttpContextContract) {
    try {
      const { id } = params

      const [data] = await prisma.$transaction([
        prisma.responsiblesEntes.findMany({
          where: { enteId: Number(id), deleted: false },
          select: {
            id: true,
            ente: true,
            enteId: true,
            responsible: true,
            responsabilityId: true,
            profession: true,
            professionId: true,
            firstName: true,
            lastName: true,
            identity: true,
            gender: true,
            birthDate: true,
            email: true,
            phone: true,
            assignedBy: true,
          },
        }),
      ])

      console.log(data)
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
      await prisma.responsiblesEntes.update({
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
      await prisma.responsiblesEntes.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_DELETE })
    }
  }
}
