import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Parroquias } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class ParroquiasController {
  public async index({ request, response }: HttpContextContract) {
    try {

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          nombre: schema.string.optional(),
          municipioId: schema.number.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.parroquias.count({ where: filters }),
        prisma.parroquias.findMany({
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
    const data = request.body() as Parroquias
    try {
      await prisma.parroquias.create({ data: { ...data } })
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
        prisma.parroquias.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            nombre: true,
            municipioId: true,
            municipios: true,
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
      await prisma.parroquias.update({
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
      await prisma.parroquias.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_DELETE })
    }
  }
}
