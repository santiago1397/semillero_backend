import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Municipios } from '@prisma/client';
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class MunicipiosController {
  public async index({}: HttpContextContract) {
    try {
      const [ total, data ] = await prisma.$transaction([
        prisma.municipios.count(),
        prisma.municipios.findMany({
        take: 10,
        skip: 0,
        select: {
          id: true,
          nombre: true,
          estadoId: true,
          estado: true,        
          parroquias: true
        },
        })
      ]);
  
      return { total, data };      
    } catch (error) {
      console.log(error);
      return { message: enumErrors.DEFAULT };
    }
  }

  

  public async store({ request }: HttpContextContract) {
    const data = request.body() as Municipios;
    try {
      await prisma.municipios.create({ data: { ...data } });
      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err);
      return { message: enumErrors.ERROR_CREATE };
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const { id } = params;
      const [ data ] = await prisma.$transaction([
        prisma.municipios.findMany({
          where: { id : Number(id)},
          select: {
            id: true,
            nombre: true,
            estadoId: true,
            estado: true,        
            parroquias: true
          },
        })
      ]);
      return { data };
    } catch (error) {
      console.log(error);
      return { message: enumErrors.ERROR_SELECT }
    }
  }


  public async update({ request, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = request.body();
      await prisma.municipios.update({
        where: { id: Number(id) },
        data: data
      });
      return { message: enumSuccess.UPDATE }
    } catch (error) {
      console.log(error);
      return { message: enumErrors.ERROR_UPDATE }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const { id } = params;
      await prisma.municipios.delete({
        where: { id: Number(id) }
      });
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error);
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}