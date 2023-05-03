import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Parents } from '@prisma/client';
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class ParentsController {
  public async index({}: HttpContextContract) {
    try {
      const [ total, data ] = await prisma.$transaction([
        prisma.parents.count(),
        prisma.parents.findMany({
        take: 10,
        skip: 0,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          identity: true,        
          birthDate: true,
          relationshipId: true,
          relationship: true,
          phone: true,
          localPhone: true,
          email: true,
          professionId: true,
          profession: true,
          createBy: true,
          updatedBy: true,
          version: true
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
    const data = request.body() as Parents;
    try {
      await prisma.parents.create({ data: { ...data } });
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
        prisma.parents.findMany({
          where: { id : Number(id)},
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identity: true,        
            birthDate: true,
            relationshipId: true,
            relationship: true,
            phone: true,
            localPhone: true,
            email: true,
            professionId: true,
            profession: true,
            createBy: true,
            updatedBy: true,
            version: true
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
      await prisma.parents.update({
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
      await prisma.parents.delete({
        where: { id: Number(id) }
      });
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error);
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}