import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { enumSuccess } from 'App/Utils/utils'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string(),
      }),
      messages: {
        required: 'El {{ field }} es requerido para iniciar sesion',
      },
    })
    const token = await auth.use('api').attempt(payload.email, payload.password, {
      expiresIn: '1 day',
    })

    const user = await prisma.users.findMany({
      where: { email: payload.email },
      select: {
        id: true,
        email: true,
        createdBy: true,
        updatedBy: true,
        version: true,
        profile: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        userRole: {
          select: {
            roleId: true,
            role: {
              select: {
                name: true,
              },
            },
            enteId: true,
            ente: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
    return { token: token, data: user }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      message: enumSuccess.LOGOUT,
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.create({
      email: email,
      password: password,
    })

    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }

  public async recoverPassword({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const user = await User.findByOrFail('email', email)

    if (user) {
      const token = await auth.use('api').generate(user, {
        expiresIn: '10 mins',
      })

      console.log('token:', token)

      let mailer = await new Mailer(
        user,
        'Recuperación de acceso Sistema Correspondencia',
        true,
        'recover',
        {
          user: { fullname: user.username },
          url: `localhost:3333/reset-password/${token.tokenHash}`,
        },
        '',
        []
      ).preview()
      return mailer
    } else {
      return { message: 'El correo que has ingresado es incorrecto o no está registrado' }
    }
  }

  public async resetPassword({ request }: HttpContextContract) {}
}
