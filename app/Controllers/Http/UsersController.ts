import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Users } from '@prisma/client';
import { enumErrors, enumSuccess } from '../../Utils/utils'

export default class UsersController {
  public async index({}: HttpContextContract) {
    try {
      const [ total, data ] = await prisma.$transaction([
        prisma.users.count(),
        prisma.users.findMany({
        take: 10,
        skip: 0,
        select: {
          id: true,
          email: true,
          createdBy: true,
          updatedBy: true,
          version: true,
          profile: {
            select: {
              firstName: true,
              lastName: true
            },
          },
          userRole: {
            select: {
              roleId: true,
              role: {
                select : {
                  name: true
                }
              },
              enteId: true,
              ente: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        })
      ]);
  
      return { total, data };      
    } catch (error) {
      console.log(error);
      return { message: enumErrors.DEFAULT };
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = request.body() as Users;
    try {
      await prisma.users.create({ data: { ...data } });
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
        prisma.users.findMany({
          where: { id : Number(id)},
          select: {
            id: true,
            email: true,
            createdBy: true,
            updatedBy: true,
            version: true,
            profile: {
              select: {
                firstName: true,
                lastName: true
              },
            },
            userRole: {
              select: {
                roleId: true,
                role: {
                  select : {
                    name: true
                  }
                },
                enteId: true
              }
            }
          },
        })
      ]);
      return { data };
    } catch (error) {
      console.log(error);
      return { message: enumErrors.ERROR_SELECT }
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    try {
      const { id } = params;
      const data = request.body();
      await prisma.users.update({
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
      await prisma.activities.delete({
        where: { id: Number(id) }
      });
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error);
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
