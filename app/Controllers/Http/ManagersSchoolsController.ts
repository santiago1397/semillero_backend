import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { ManagersSchools } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class ManagersSchoolsController {
  public async index({}: HttpContextContract) {
    try {
      const [total, data] = await prisma.$transaction([
        prisma.managersSchools.count(),
        prisma.managersSchools.findMany({
          take: 10,
          skip: 0,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identity: true,
            phone: true,
            localPhone: true,
            email: true,
            createBy: true,
            updatedBy: true,
            version: true,
            codPlantel: true,
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
    const data = request.body() as ManagersSchools
    try {
      await prisma.managersSchools.create({ data: { ...data } })
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
        prisma.managersSchools.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identity: true,
            phone: true,
            localPhone: true,
            email: true,
            createBy: true,
            updatedBy: true,
            version: true,
            codPlantel: true,
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
      await prisma.managersSchools.update({
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
      await prisma.managersSchools.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
