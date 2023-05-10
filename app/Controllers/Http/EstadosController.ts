import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Estados } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class EstadosController {
  public async index({ request }: HttpContextContract) {
    try {

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          nombre: schema.string.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.estados.count({ where: filters }),
        prisma.estados.findMany({
          where: filters,
        }),
      ])

      return { total, data }
    }  catch (error) {
      console.log(error)
      return { message: enumErrors.DEFAULT }
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.body() as Estados
    try {
      await prisma.estados.create({ data: { ...data } })
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
        prisma.estados.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            nombre: true,
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
      await prisma.estados.update({
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
      await prisma.estados.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
