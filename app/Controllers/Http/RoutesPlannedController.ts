import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Prisma } from '@prisma/client'
import File from 'App/Services/File'
import MapExcel from 'App/Services/MapExcel'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import Mailer from 'App/Mailers/Mailer'
import { CLIENT_RENEG_LIMIT } from 'tls'

export default class RoutesPlannedController {
  public async index({ request, response }: HttpContextContract) {
    try {
      /* console.log(request) */
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      
      


      // Filters
      const filters = await request.validate({
        schema: schema.create({
          name: schema.string.optional(),
          siteId: schema.number.optional(),
          enteId: schema.number.optional(),
          codPlantel: schema.string.optional(),
          activityId: schema.number.optional(),
          datePlanned: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      if (filters.enteId) {/*  Object.assign(filters, { userRole: { is: { enteId: filters.enteId } } });  */} else{
        delete filters.enteId;
      }

      const [total, data] = await prisma.$transaction([
        prisma.routesPlanned.count({ where: filters }),
        prisma.routesPlanned.findMany({
          ...pagination,
          include: {
            activity: true,
            //site: true,
            //plantel: true,
            ente: true
          },
          where: filters,
        }),
      ])

      //console.log(data)
      return { total, data }

    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.DEFAULT })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      let uploaded = await File.upload(request);
      /* console.log(uploaded)
      console.log(request) */
      // Payload
      /* const payload = await request.validate({
        schema: schema.create({
          name: schema.string(),
          activityId: schema.string(),
          enteId: schema.string(),
          datePlanned: schema.string(),

        }),
      });  */


      var payload = await request.validate({
        schema: schema.create({
          name: schema.string(),
          activityId: schema.number(),
          enteId: schema.number(),
          datePlanned: schema.string(),
          observations: schema.string(),
          fileExtension: schema.string(),
          createBy: schema.number()
          /* siteId: schema.number(),
          codPlantel: schema.string(),
          responsibleIdentity: schema.string(),
          responsibleFirstName: schema.string(),
          responsibleLastName: schema.string(),
          responsiblePhone: schema.string(),
          responsibleCargo: schema.string()  */
        }),
      });


      
      if (!uploaded.status) return response.status(500).json({ message: "Error con el archivo invalido" })


      const mappedData: Prisma.StudentsCreateManyInput[] = await MapExcel.map(uploaded.filename);

      payload.fileExtension = uploaded.fileExtension

      const [data] = await prisma.$transaction([
        prisma.users.findMany({
          where: { id: Number(payload.createBy) },
        }),
      ])

      const [data2] = await prisma.$transaction([
        prisma.usersProfiles.findMany({
          where: { userId: Number(payload.createBy) },
        }),
      ])


      payload.createBy = `${data2[0].firstName} ${data2[0].lastName} ${data[0].email}`
      Object.assign(payload, {check: false} )

      var lmao = await prisma.$transaction([

        prisma.routesPlanned.create({ data: payload })
      ]);


      mappedData.forEach((item) => item.routesPlannedId = lmao[0].id)
      await prisma.$transaction([
        prisma.students.createMany({ data: mappedData, skipDuplicates: false })
      ]);



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
        prisma.routesPlanned.findMany({
          where: { id: Number(id) },
          include: {
            activity: true,
            ente: true,
            // plantel: true,
            // site: true
          }
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
      delete data.ente
      delete data.activity
      await prisma.routesPlanned.update({
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


      await prisma.students.deleteMany({
        where: { routesPlannedId: Number(id)},
      })

      await prisma.routesPlanned.delete({
        where: { id: Number(id) },
      })

      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_DELETE })
    }
  }

  public async report({ auth, request, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()
      // Filters
      const filters = await request.validate({
        schema: schema.create({
          enteId: schema.number.optional(),
          startDate: schema.string.optional(),
          endDate: schema.string.optional(),
        }),
      })

      console.log(request)
      var f = {};
      if (filters.startDate && filters.endDate) {
        Object.assign(f, {datePlanned: { lte: filters.endDate, gte: filters.startDate }} )
      }

      if (filters.enteId) {
        Object.assign(f, { enteId: filters.enteId });
      }

      console.log(f)

      MapExcel.export(f);
      const files = [
        "reporte.xlsx"
      ];



      let mail = await new Mailer(auth.use('api').user!.email, 'Reporte Semilleros Cientificos', true, 'test', { user: { fullname: 'Eloy Gonzalez' }, url: 'https://your-app.com/verification-url' }, 'storage/', files).send();
      console.log('Mail Report', mail);
      return { message: enumSuccess.REPORTSENDED };
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.REPORTERROR })
    }
  }

  public async download({ request, response, params }: HttpContextContract) {
    console.log("path download")
    console.log(request)
    console.log(params)
    try {
      return await File.download(response, request)
    } catch (error) {
      return response.status(500).json({ message: enumErrors.REPORTERROR })
    }

  }
}
