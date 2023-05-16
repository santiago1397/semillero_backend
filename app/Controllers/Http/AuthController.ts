import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { enumErrors, enumSuccess } from 'App/Utils/utils'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    try {
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
        include: {
          profile: true,
          userRole: {
            include: {
              role: true,
              ente: {
                include: {
                  estado: true
                }
              }
            }
          },
        },
      })
      return { token: token, data: user }
    } catch (error){
      console.log(error);
      response.unauthorized({ message: enumErrors.LOGIN });
    }
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
      let mailer = await Mail.send((message) => {
        message
          .from(Env.get('SMTP_USERNAME'))
          .to(email)
          .subject('Recuperacion de contraseña')
          .htmlView('/var/www/html/semillero_backend/resources/views/password_recovery.edge', {
            user: { fullname: user.profile?.firstName },
            url: `${Env.get('DNS')}/resetear/${token.token}`,
          })
      })

      return mailer
    } else {
      return { message: 'El correo que has ingresado es incorrecto o no está registrado' }
    }
  }

  public async resetPassword({ auth, request, response }: HttpContextContract) {
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
      
      await auth.use('api').revoke()
      return { message: enumSuccess.UPDATEPASSWORD }
    } catch (err) {
      console.log(err)
      return response.status(500).json({ message: enumErrors.ERROR_CREATE });
    }
  }
}
