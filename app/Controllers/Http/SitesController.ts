import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Sites } from '@prisma/client'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import { schema } from '@ioc:Adonis/Core/Validator'
export default class SitesController {
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
          typeId: schema.number.optional(),
          typeSite: schema.number.optional(),
          pedagogicalObjective: schema.string.optional(),
          activities: schema.string.optional(),
          direction: schema.string.optional(),
          estadoId: schema.number.optional(),
          municipioId: schema.number.optional(),
          parroquiaId: schema.number.optional(),
          phone: schema.string.optional(),
          email: schema.string.optional(),
          active: schema.boolean.optional(),
          biosecurity: schema.boolean.optional(),
          bathrooms: schema.boolean.optional(),
          parking: schema.boolean.optional(),
          medicalService: schema.boolean.optional(),
          diningRoom: schema.boolean.optional(),
          socialNetworks: schema.string.optional(),
          googleMapLink: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.sites.count(),
        prisma.sites.findMany({
          select: {
            id : true,
            name : true,
            typeId : true,
            typeSite : true,
            type: true,
            pedagogicalObjective : true,
            activities : true,
            direction : true,
            estadoId : true,
            municipioId : true,
            parroquiaId : true,
            phone : true,
            email : true,
            active : true,
            biosecurity : true,
            bathrooms : true,
            parking : true,
            medicalService : true,
            diningRoom : true,
            socialNetworks : true,
            googleMapLink : true,
            deleted : true,
            createBy : true,
            updatedBy : true,
            version : true,
            estado: true,
            municipio: true,
            parroquia: true
          },
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
            estadoId: true,
            municipioId: true,
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
