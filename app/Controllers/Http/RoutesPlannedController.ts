import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Prisma } from '@prisma/client'
import File from 'App/Services/File'
import MapExcel from 'App/Services/MapExcel'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import Mailer from 'App/Mailers/Mailer'

export default class RoutesPlannedController {
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
          siteId: schema.number.optional(),
          codPlantel: schema.string.optional(),
          activityId: schema.number.optional(),
          datePlanned: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      const [total, data] = await prisma.$transaction([
        prisma.routesPlanned.count({ where: filters }),
        prisma.routesPlanned.findMany({
          ...pagination,
          include: {
            activity: true,
            site: true,
            plantel: true,
            ente: true
          },
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
    try {
      let uploaded = await File.upload(request);

      // Payload
      const payload = await request.validate({
        schema: schema.create({
          name: schema.string(),
          siteId: schema.number(),
          codPlantel: schema.string(),
          activityId: schema.number(),
          enteId: schema.number(),
          datePlanned: schema.string(),
          responsibleIdentity: schema.string(),
          responsibleFirstName: schema.string(),
          responsibleLastName: schema.string(),
          responsiblePhone: schema.string(),
          responsibleCargo: schema.string()
        }),
      });

      if (!uploaded.status) return { message: enumErrors.FILE_NOT_UPLOADED }
      const mappedData: Prisma.StudentsCreateManyInput[] = await MapExcel.map(uploaded.filename);

      await prisma.$transaction([
        prisma.students.createMany({ data: mappedData, skipDuplicates: true }),
        prisma.routesPlanned.create({ data: payload })
      ]);
      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err.message)
      return { message: enumErrors.ERROR_CREATE }
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const { id } = params
      const [data] = await prisma.$transaction([
        prisma.routesPlanned.findMany({
          where: { id: Number(id) },
          select: {
            id: true,
            name: true,
            siteId: true,
            codPlantel: true,
            plantel: true,
            activityId: true,
            activity: true,
            datePlanned: true,
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
      await prisma.routesPlanned.update({
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
      await prisma.routesPlanned.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }

  public async report({ request, response }: HttpContextContract){
    // Filters
    const filters = await request.validate({
      schema: schema.create({
        email: schema.string(),
        enteId: schema.number.optional(),
        startData: schema.string.optional(),
        endDate: schema.string.optional(),
      }),
    })

    let f = {};
    if(filters.startData && filters.endDate){
      Object.assign(f, { datePlanned: { lte: filters.endDate, gte: filters.startData }})
    }

    if(filters.enteId){
      Object.assign(f, { enteId : filters.enteId });
    }

    MapExcel.export(f);
    const files = [
      "reporte.xlsx"
    ];

    let mailer = await new Mailer(filters.email, 'Reporte Semilleros Cientificos', true, 'test', { user: { fullname: 'Eloy Gonzalez'}, url: 'https://your-app.com/verification-url' }, 'storage/', files).preview();
    return mailer;
    // File.download(response);
  }
}
