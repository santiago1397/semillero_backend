import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Relationship } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class RelationshipController {
  public async index({ request }: HttpContextContract) {
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
        prisma.relationship.count({ where: filters }),
        prisma.relationship.findMany({
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
    const data = request.body() as Relationship
    try {
      await prisma.relationship.create({ data: { ...data } })
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
        prisma.relationship.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            name: true,
            createBy: true,
            updatedBy: true,
            version: true,
            parents: true,
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
      await prisma.relationship.update({
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
      await prisma.relationship.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
