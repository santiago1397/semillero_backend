import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { ResponsiblesEntes } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class ResponsiblesEntesController {
  public async index({}: HttpContextContract) {
    try {
      const [total, data] = await prisma.$transaction([
        prisma.responsiblesEntes.count(),
        prisma.responsiblesEntes.findMany({
          take: 10,
          skip: 0,
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

      return { total, data }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.DEFAULT }
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.body() as ResponsiblesEntes
    try {
      await prisma.responsiblesEntes.create({ data: { ...data } })
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
        prisma.responsiblesEntes.findMany({
          where: { enteId: Number(id) },
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
      await prisma.responsiblesEntes.update({
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
      await prisma.responsiblesEntes.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
