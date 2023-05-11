import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { IPagination, enumErrors, enumSuccess, mapToPagination } from '../../Utils/utils'
import Hash from '@ioc:Adonis/Core/Hash'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
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
      if (filters.enteId) { Object.assign(filters, { userRole: { some: { enteId: filters.enteId } } }); }
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
      return { message: enumErrors.DEFAULT }
    }
  }

  public async store({ request }: HttpContextContract) {
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
      return { message: enumErrors.ERROR_CREATE }
    }
  }

  public async show({ params }: HttpContextContract) {
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
      return { message: enumErrors.ERROR_SELECT }
    }
  }

  public async update({ request, params }: HttpContextContract) {
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
        // profile: {
        //   update: {
        //     where: { userId: Number(id) },
        //     data: {
        //       firstName: payload.firstName,
        //       lastName: payload.lastName,
        //       identity: payload.identity
        //     }
        //   }
        // },
        userRole: {
          update: {
            data: {
              enteId: payload.ente,
              roleId: payload.role
            },
            where: {
              userId_roleId_enteId:  { userId: Number(id), roleId: payload.role, enteId: payload.ente}
            }
          }
        }
      }

      // Hash password
      var password = '';
      if (payload.password) {
        password = await Hash.make(payload.password);
        Object.assign(data, { password: password });
      }

      console.log('data', data);

      const register = await prisma.users.update({
        where: { id: Number(id) },
        data: data
      })

      console.log('registed', register);

      return { message: enumSuccess.UPDATE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_UPDATE }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const { id } = params
      await prisma.activities.delete({
        where: { id: Number(id) },
      })
      return { message: enumSuccess.DELETE }
    } catch (error) {
      console.log(error)
      return { message: enumErrors.ERROR_DELETE }
    }
  }
}
