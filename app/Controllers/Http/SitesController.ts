import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Sites } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class SitesController {
  public async index({}: HttpContextContract) {
    try {
      const [total, data] = await prisma.$transaction([
        prisma.sites.count(),
        prisma.sites.findMany({
          take: 10,
          skip: 0,
          select: {
            id: true,
            name: true,
            typeId: true,
            type: true,
            typeSite: true,
            pedagogicalObjective: true,
            activities: true,
            direction: true,
            parroquiaId: true,
            phone: true,
            email: true,
            active: true,
            biosecurity: true,
            bathrooms: true,
            parking: true,
            medicalService: true,
            diningRoom: true,
            socialNetworks: true,
            googleMapLink: true,
            createBy: true,
            updatedBy: true,
            version: true,
            manager: true,
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
    const data = request.body() as Sites
    try {
      await prisma.sites.create({ data: { ...data } })
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
        prisma.sites.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            name: true,
            typeId: true,
            type: true,
            typeSite: true,
            pedagogicalObjective: true,
            activities: true,
            direction: true,
            parroquiaId: true,
            phone: true,
            email: true,
            active: true,
            biosecurity: true,
            bathrooms: true,
            parking: true,
            medicalService: true,
            diningRoom: true,
            socialNetworks: true,
            googleMapLink: true,
            createBy: true,
            updatedBy: true,
            version: true,
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
      await prisma.sites.update({
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
      await prisma.sites.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
