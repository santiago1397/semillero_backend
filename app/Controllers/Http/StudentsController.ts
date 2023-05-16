import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
export default class StudentsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          codPlantel: schema.string.optional(),
          firstName: schema.string.optional(),
          lastName: schema.string.optional(),
          identity: schema.string.optional(),
          birthDate: schema.string.optional(),
          gender: schema.string.optional(),
          sizeShirt: schema.string.optional(),
          disability: schema.string.optional(),
          direction: schema.string.optional(),
          estadoId: schema.string.optional(),
          municipioId: schema.string.optional(),
          parroquiaId: schema.string.optional(),
          phone: schema.string.optional(),
          localPhone: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.students.count({ where: filters }),
        prisma.students.findMany({
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
    try {
      const payload = await request.validate({
        schema: schema.create({
          firstName: schema.string(),
          lastName: schema.string(),
          codPlantel: schema.string(),
          identity: schema.string(),
          birthDate: schema.string(),
          gender: schema.string(),
          sizeShirt: schema.string(),
          disability: schema.string(),
          direction: schema.string(),
          estadoId: schema.string(),
          municipioId: schema.string(),
          parroquiaId: schema.string(),
          phone: schema.string(),
          localPhone: schema.string(),
        }),
      })
      await prisma.students.createMany({ data: payload, skipDuplicates: true })
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
        prisma.students.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            codPlantel: true,
            firstName: true,
            lastName: true,
            identity: true,
            birthDate: true,
            gender: true,
            sizeShirt: true,
            disability: true,
            direction: true,
            estado: true,
            municipio: true,
            parroquia: true,
            phone: true,
            localPhone: true,
            createBy: true,
            updatedBy: true,
            version: true,
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
      await prisma.students.update({
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
      await prisma.students.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_DELETE })
    }
  }
}
