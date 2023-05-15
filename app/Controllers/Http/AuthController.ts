import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { enumErrors, enumSuccess } from 'App/Utils/utils'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

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

  public async register({ request }: HttpContextContract) {
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

      await prisma.users.create({ data : {
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
      }});
      return { message: enumSuccess.CREATE }
    } catch (err) {
      console.log(err)
      return { message: enumErrors.ERROR_CREATE }
    }
  }

  public async recoverPassword({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const user = await prisma.users.findFirstOrThrow({ 
      where: { email: email },
      include: { 
        profile: true,
      },
    })

    if (user) {
      const token = await auth.use('api').generate(user, {
        expiresIn: '10 mins',
      })

      console.log('token:', token)
      let mailer = await Mail.preview((message) => {
        message
          .from(Env.get('SMTP_USERNAME'))
          .to(email)
          .subject('Recuperacion de contraseña')
          .htmlView('/var/www/html/semillero_backend/resources/views/password_recovery.edge', {
            user: { fullname: user.profile?.firstName },
            url: `${Env.get('DNS')}/resetear/${token.tokenHash}`,
          })
      })

      console.log(mailer)
      /* let mailer = await new Mailer(
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
      ).preview() */
      return mailer
    } else {
      return { message: 'El correo que has ingresado es incorrecto o no está registrado' }
    }
  }

  public async resetPassword({ auth, request }: HttpContextContract) {
    try {
      await auth.use('api').authenticate()

      // Validations
      const payload = await request.validate({
        schema: schema.create({
          password: schema.string()
        }),
      });

      // Hash password
      const password = await Hash.make(payload.password);

      await prisma.users.update({
        where: { id: auth.use('api').user!.id },
        data: { password : password}
      });
      return { message: enumSuccess.UPDATEPASSWORD }
    } catch (err) {
      console.log(err)
      return { message: enumErrors.ERROR_CREATE }
    }
  }
}
