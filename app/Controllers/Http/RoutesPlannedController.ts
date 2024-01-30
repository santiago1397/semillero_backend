import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Prisma } from '@prisma/client'
import File from 'App/Services/File'
import MapExcel from 'App/Services/MapExcel'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import Mailer from 'App/Mailers/Mailer'
import { CLIENT_RENEG_LIMIT } from 'tls'


import fs from 'fs'
import Drive from '@ioc:Adonis/Core/Drive'
import { ClassificationType } from 'typescript'

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
          enteId: schema.number.optional(), 
          codPlantel: schema.string.optional(),
          activityId: schema.number.optional(),
          datePlanned: schema.string.optional(),
          deleted: schema.boolean.optional(),
        }),
      })

      if (filters.enteId) {/*  Object.assign(filters, { userRole: { is: { enteId: filters.enteId } } });  */ } else {
        delete filters.enteId;
      }

      var manyEntities: any

      if(request.qs().filters != ""){
        delete filters.enteId;


        let alg = request.qs().filters.split(",").map(Number)
        console.log(alg)
        manyEntities = { in: alg }
      }

      var finaltotal
      var finaldata

      if(filters.enteId){
        const [total, data] = await prisma.$transaction([
          prisma.routesPlanned.count({ where: filters }),
          prisma.routesPlanned.findMany({
            ...pagination,
            orderBy: [
              {
                id: 'desc'
              }
            ],
            include: {
              activity: true,
              //site: true,
              //plantel: true,
              ente: true
            },
            where: filters,
          }),
        ])

        finaltotal =total
        finaldata =data
      }else{
        const [total, data] = await prisma.$transaction([
          prisma.routesPlanned.count({ where: {...filters, enteId: manyEntities} }),
          prisma.routesPlanned.findMany({
            ...pagination,
            include: {
              activity: true,
              //site: true,
              //plantel: true,
              ente: true
            },
            where: {...filters, enteId: manyEntities},
          }),
        ])

        
        finaltotal =total
        finaldata =data
      }


      return {total: finaltotal, data: finaldata }

    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.DEFAULT })
    }
  }

  public async store({ request, response }: HttpContextContract) {

    var result
    var lmao
    try {
      let uploaded = await File.upload(request);
      

      console.log(request)


      var payload = await request.validate({
        schema: schema.create({
          name: schema.string(),
          activityId: schema.number(),
          enteId: schema.number(),
          datePlanned: schema.string(),
          observations: schema.string(),
          fileExtension: schema.string(),
          createBy: schema.string(),
          estadoId: schema.string(),
          municipioId: schema.string(),
          parroquiaId: schema.string(),
          
        }),
      });



      if (!uploaded.status) return response.status(500).json({ message: "Error con el archivo invalido" })


      const mappedData: Prisma.StudentsCreateManyInput[] = await MapExcel.map(uploaded.filename, payload.enteId);

      var validatedData: Prisma.StudentsCreateManyInput[] = []


      /* console.log(mappedData[0])
      console.log(mappedData.length) */

      for (let i = 0; i <= mappedData.length; i++) {
        if (mappedData[i]) {
          if ((mappedData[i].firstName) && (mappedData[i].firstName !== '')) {
            validatedData.push(mappedData[i])
          }

        }
      }

      /* console.log(validatedData)
      console.log("total:"+validatedData.length)
      console.log("data validada") */

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
      Object.assign(payload, { check: false })

      /* console.log(mappedData) */

      /* console.log(mappedData) */
      const allTrue = mappedData.every(obj => {
        return (
          (typeof obj.codPlantel === "string") &&
          (typeof obj.firstName === "string") &&
          (typeof obj.lastName === "string") &&
          (typeof obj.age === "number" || "null") &&
          (typeof obj.gender === "string") &&
          (typeof obj.grade === "string") &&
          (typeof obj.activityMade === "string") &&
          (typeof obj.activityPlace === "string") &&
          (typeof obj.entityInCharge === "string") &&
          (typeof obj.InChargeLastName === "string") &&
          (typeof obj.InChargeName === "string") &&
          (typeof obj.InChargeIdentity === "string") &&
          (typeof obj.InChargeCharge === "string") &&
          (typeof obj.InChargePhone === "string") &&
          (typeof obj.InChargeLocalPhone === "string") &&
          (typeof obj.InChargeEmail === "string") &&
          (typeof obj.InChargeProfession === "string") &&
          (typeof obj.sizeShirt === "string") &&
          (typeof obj.disability === "string") &&
          (typeof obj.intitutionDirection === "string") &&
          (typeof obj.intitutionEstado === "string") &&
          (typeof obj.intitutionMunicipio === "string") &&
          (typeof obj.intitutionParroquia === "string") &&
          (typeof obj.direction === "string") &&
          (typeof obj.estado === "string") &&
          (typeof obj.municipio === "string") &&
          (typeof obj.parroquia === "string") &&
          (typeof obj.localPhone === "string") &&
          (typeof obj.phone === "string") &&
          (typeof obj.firstNameResponsible === "string") &&
          (typeof obj.lastNameResponsible === "string") &&
          (typeof obj.ageResponsible === "number" || "null") &&
          (typeof obj.relationshipResponsible === "string") &&
          (typeof obj.phoneResponsible === "string") &&
          (typeof obj.localPhoneResponsible === "string") &&
          (typeof obj.emailResponsible === "string") &&
          (typeof obj.professionResponsible === "string")

        )

      })

      if (true) {
        lmao = await prisma.$transaction([
          prisma.routesPlanned.create({ data: payload })
        ]);

        /* console.log(mappedData[0].enteId) */

        mappedData.forEach((item) => item.routesPlannedId = lmao[0].id)
        result = await prisma.$transaction([
          prisma.students.createMany({ data: mappedData, skipDuplicates: false })
        ]);

      } else {
        return response.status(500).json({ message: enumErrors.ERROR_CREATE })
      }







      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err)

      if(result == undefined){
        console.log("si esta entrando?")
        await prisma.routesPlanned.delete({
          where: { id: Number(lmao[0].id) },
        })
      }
      
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
        where: { routesPlannedId: Number(id) },
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
        Object.assign(f, { datePlanned: { lte: filters.endDate, gte: filters.startDate } })
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
    /* console.log("path download")
    console.log(request)
    console.log(params)
 */


    try {

      /*  
       //cambia un valor de varios nombres en la BD
       const [data] = await prisma.$transaction([
         prisma.routesPlanned.findMany({}),
       ])
       data.forEach( async (item)=>{
         
 
         //item.name.includes(":")
         if(item.name.startsWith(":")){
           console.log(item.name)
           item.name = item.name.split(":").join("_");
           //item.name = item.name.replace(" ", "")
           console.log(item.name)
           
           await prisma.routesPlanned.update({
             where: { id: Number(item.id) },
             data: item,
     
           })
         }
         
 
       }) */
      /* await prisma.routesPlanned.update({
        where: { id: Number(id) },
        data: data,

      })
 */





      /* var files = fs.readdirSync('./tmp/storage');

      const [data] = await prisma.$transaction([
        prisma.routesPlanned.findMany({}),
      ])
      var counter = 0

      console.log("database total routes")
      console.log(data.length)

      let arr1: boolean[] = [];
      for (let i = 0; i < data.length; i += 1) {
        arr1.push(true);
      }

      var flag = false
      for (let i = 0; i < files.length; i++) {
        flag = false
        data.forEach((item, index) => {

          if (`${item.name}${item.fileExtension}` == files[i]) {
            flag = true
            arr1[index] =false
            counter++
          }
        })
        if (flag === false) {
          console.log(files[i])
        }
      }
      console.log("files")
      console.log(counter)
      counter = 0

      arr1.forEach((item, index)=>{
        if(item == true) console.log(data[index].name)
      })

      
      //recorre los archivos para comprobar que todas las rows tengan par
      for (let i = 0; i < data.length; i++) {
        if (await Drive.exists(`${data[i].name}${data[i].fileExtension}`)) {
          counter++
        } else {
          console.log(data[i].name + " doesnt exist")
        }
      }

      console.log("files paired")
      console.log(counter) */



      //var entes : string[] = []


      //reading the students
      /* const [entes] = await prisma.$transaction([prisma.entes.findMany({}),])
      const [rutas] = await prisma.$transaction([prisma.routesPlanned.findMany({}),])
      const [students] = await prisma.$transaction([prisma.students.findMany({}),])
    

      var counter = 0
      for (let i = 0; i< entes.length; i++){
        
        counter = 0
        for (let j = 0; j< rutas.length; j++){
          if(rutas[j].enteId == entes[i].id){
            for (let k = 0; k< students.length; k++){
              if(students[k].routesPlannedId == rutas[j].id){
                if(students[k].firstName != ""){
                  counter++
                }
              }
            }  
          }
        }
        console.log(entes[i].acronim + "  " + counter) 
      } */
      

      



      


      /* const [data] = await prisma.$transaction([
        prisma.routesPlanned.findMany({}),
      ])

      data.forEach((item)=>{

        if (item.id == 663) console.log(item.name)
      }) */





      /* for(let i=0 ; i<files.length; i++){
        if (await Drive.exists(files[i])) {
          counter++
        }else{
          console.log("doesnt exist")
        }
      } */


       /* const pathToFile = "../../../tmp/storage/aaaa.xlsx"
       const secondPath =  path.join(__dirname,"AcitivitiesController.ts")
 
 
       fs.access(secondPath, fs.constants.F_OK, (err) => {
         console.log(`${secondPath} ${err ? 'does not exist' : 'exists'}`);
       }); */


      return await File.download(response, request)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.REPORTERROR })
    }

  }
}
