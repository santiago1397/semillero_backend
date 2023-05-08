import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Parents } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class ParentsController {
  public async index({ request }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          firstName: schema.string.optional(),
          lastName: schema.string.optional(),
          identity: schema.string.optional(),
          birthDate: schema.string.optional(),
          relationshipId: schema.number.optional(),
          phone: schema.string.optional(),
          localPhone: schema.string.optional(),
          email: schema.string.optional(),
          professionId: schema.number.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.parents.count(),
        prisma.parents.findMany({
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
    const data = request.body() as Parents
    try {
      await prisma.parents.create({ data: { ...data } })
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
        prisma.parents.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identity: true,
            birthDate: true,
            relationshipId: true,
            relationship: true,
            phone: true,
            localPhone: true,
            email: true,
            professionId: true,
            profession: true,
            createBy: true,
            updatedBy: true,
            version: true,
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
      await prisma.parents.update({
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
      await prisma.parents.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
