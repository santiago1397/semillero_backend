import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Students } from '@prisma/client'
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class StudentsController {
  public async index({}: HttpContextContract) {
    try {
      const [total, data] = await prisma.$transaction([
        prisma.students.count(),
        prisma.students.findMany({
          take: 10,
          skip: 0,
          select: {
            id: true,
            codPlantel: true,
            firstName: true,
            lastName: true,
            identity: true,
            birthDate: true,
            gender: true,
            gradeId: true,
            sizeShirt: true,
            disability: true,
            direction: true,
            estadoId: true,
            municipioId: true,
            parroquiaId: true,
            phone: true,
            localPhone: true,
            createBy: true,
            updatedBy: true,
            version: true,
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
    const data = request.body() as Students
    try {
      await prisma.students.create({ data: { ...data } })
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
            gradeId: true,
            sizeShirt: true,
            disability: true,
            direction: true,
            estadoId: true,
            municipioId: true,
            parroquiaId: true,
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
      return { message: enumErrors.ERROR_SELECT }
    }
  }

  public async update({ request, params }: HttpContextContract) {
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
      return { message: enumErrors.ERROR_UPDATE }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const { id } = params
      await prisma.students.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
