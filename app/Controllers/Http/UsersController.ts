import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import Hash from '@ioc:Adonis/Core/Hash'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      // Pagination
      const pagination = request.qs()
        ? mapToPagination(request.qs() as IPagination)
        : ({} as IPagination)

      // Filters
      let filters = await request.validate({
        schema: schema.create({
          name: schema.string.optional(),
          deleted: schema.boolean.optional(),
          enteId: schema.number.optional()
        }),
      })
      if (filters.enteId) { Object.assign(filters, { userRole: { is: { enteId: filters.enteId } } }); }
      delete filters.enteId;

      const [total, data] = await prisma.$transaction([
        prisma.users.count({ where: filters }),
        prisma.users.findMany({
          ...pagination,
          where: filters,
          include: {
            profile: true,
            userRole: {
              include: {
                role: true,
                ente: true
              }
            },
          },
        }),
      ])
      return { total, data }
    }
    catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.DEFAULT })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      // Validations
      const payload = await request.validate({
        schema: schema.create({
          email: schema.string(),
          password: schema.string(),
          firstName: schema.string(),
          lastName: schema.string(),
          identity: schema.string(),
          role: schema.number(),
          ente: schema.number()
        }),
      });

      // Hash password
      const password = await Hash.make(payload.password);

      await prisma.users.create({
        data: {
          email: payload.email,
          password: password,
          profile: {
            create: {
              firstName: payload.firstName,
              lastName: payload.lastName,
              identity: payload.identity
            }
          },
          userRole: {
            create: {
              roleId: payload.role,
              enteId: payload.ente
            }
          }
        }
      });
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
        prisma.users.findMany({
          where: { id: Number(id) },
          include: {
            profile: true,
            userRole: {
              include: {
                role: true,
                ente: true
              }
            },
          },
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

      // Validations
      const payload = await request.validate({
        schema: schema.create({
          email: schema.string(),
          password: schema.string.optional(),
          firstName: schema.string(),
          lastName: schema.string(),
          identity: schema.string(),
          role: schema.number(),
          ente: schema.number()
        }),
      });

      let data = {
        email: payload.email,
        profile: {
          update: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            identity: payload.identity,
          }
        },
        userRole: {
          update: {
            enteId: payload.ente,
            roleId: payload.role
          }
          // To update data in relations Many to Many use this example code
          // connectOrCreate: {
          //   where: { userId_roleId_enteId: { userId: Number(id), roleId: payload.role, enteId: payload.ente } },
          //   create: {
          //     roleId: payload.role,
          //     enteId: payload.ente
          //   }
          // },
        }
      }

      // Hash password
      var password = '';
      if (payload.password) {
        password = await Hash.make(payload.password);
        Object.assign(data, { password: password });
      }

      await prisma.users.update({
        where: { id: Number(id) },
        data: data,
        include: {
          userRole: true,
          profile: true
        }
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
      await prisma.usersRoles.delete({
        where: { userId: Number(id) },
      })
      await prisma.usersProfiles.delete({
        where: { userId: Number(id) },
      })
      await prisma.users.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: enumErrors.ERROR_DELETE })
    }
  }
}
