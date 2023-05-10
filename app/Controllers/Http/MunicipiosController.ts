import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Municipios } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class MunicipiosController {
  public async index({ request }: HttpContextContract) {
    try {

      // Filters
      const filters = await request.validate({
        schema: schema.create({
          nombre: schema.string.optional(),
          estadoId: schema.number.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        
        prisma.municipios.count({ where: filters }),
        prisma.municipios.findMany({
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
    const data = request.body() as Municipios
    try {
      await prisma.municipios.create({ data: { ...data } })
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
        prisma.municipios.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            nombre: true,
            estadoId: true,
            estado: true,
            parroquias: true,
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
      await prisma.municipios.update({
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
      await prisma.municipios.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
