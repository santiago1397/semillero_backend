import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    for (const u of await this.getUsers()) {
      const user = await prisma.users.create({ data: u })
      console.log(`User created with id: ${user.id}`)
    }
  }

  public async generatePassword(password) {
    return await Hash.make(password)
  }

  public async getUsers() {
    const hash = await this.generatePassword('123456')

    const usersData: Prisma.UsersCreateInput[] = [
      {
        email: '******************',
        password: hash,
        profile: {
          create: {
            firstName: '******************',
            lastName: '******************',
            identity: '******************',
            phone: '******************',
          },
        },
      },
      {
        email: 'admin@mppct.gob.ve',
        password: hash,
        userRole: {
          create: {
            roleId: 1,
            enteId: 1,
          },
        },
        profile: {
          create: {
            firstName: 'Admin',
            lastName: 'Admin',
            identity: '23687347',
            phone: '04242577653',
          },
        },
      },
      {
        email: 'camejo1984@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 31,
          },
        },
        profile: {
          create: {
            firstName: 'JEFERSON',
            lastName: 'CAMEJO',
            identity: '16512897',
            phone: '04265123341',
          },
        },
      },
      {
        email: 'utanzpresidencia@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 32,
          },
        },
        profile: {
          create: {
            firstName: 'VICTOR',
            lastName: 'HUGO',
            identity: '',
            phone: '',
          },
        },
      },
      {
        email: 'ronnyeguez@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 33,
          },
        },
        profile: {
          create: {
            firstName: 'RONNY JOSE',
            lastName: 'YEGUEZ MASS',
          },
        },
      },
      {
        email: 'pedromerentes@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 34,
          },
        },
        profile: {
          create: {
            firstName: 'PEDRO',
            lastName: 'MERENTES',
          },
        },
      },
      {
        email: 'mfutbarinas@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 35,
          },
        },
        profile: {
          create: {
            firstName: 'ZAIRA',
            lastName: 'VIVAS',
          },
        },
      },
      {
        email: 'presidencia.fundacitebolivar@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 36,
          },
        },
        profile: {
          create: {
            firstName: 'LUIS',
            lastName: 'CÁRDENAS',
          },
        },
      },
      {
        email: 'presidentefundacite@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 37,
          },
        },
        profile: {
          create: {
            firstName: 'EFRAÍN',
            lastName: 'MARÍN',
          },
        },
      },
      {
        email: 'utfundacitecojedes@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 38,
          },
        },
        profile: {
          create: {
            firstName: 'PABLO',
            lastName: 'RODRIGUEZ',
          },
        },
      },
      {
        email: 'presidenciafundacitedelta@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 39,
          },
        },
        profile: {
          create: {
            firstName: 'JHONNY',
            lastName: 'GOMEZ',
          },
        },
      },
      {
        email: 'yugre202003@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 40,
          },
        },
        profile: {
          create: {
            firstName: 'JUOGREIDIN',
            lastName: 'CERERO',
          },
        },
      },
      {
        email: 'jjmadridh@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 41,
          },
        },
        profile: {
          create: {
            firstName: 'JIM JOSE',
            lastName: 'MADRID',
          },
        },
      },
      {
        email: 'presidenciafundacitelara1@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 42,
          },
        },
        profile: {
          create: {
            firstName: 'ANGÉLICA',
            lastName: 'GONZALEZ',
          },
        },
      },
      {
        email: 'mmora.fundacite@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 43,
          },
        },
        profile: {
          create: {
            firstName: 'MARIA NATHALY',
            lastName: 'MORA',
          },
        },
      },
      {
        email: 'hector.constant@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 44,
          },
        },
        profile: {
          create: {
            firstName: 'HECTOR',
            lastName: 'CONSTANT',
          },
        },
      },
      {
        email: 'ariamandrea26@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 45,
          },
        },
        profile: {
          create: {
            firstName: 'MARIA',
            lastName: 'HERNANDEZ',
          },
        },
      },
      {
        email: 'presidenciafundacitene@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 46,
          },
        },
        profile: {
          create: {
            firstName: 'VANESSA',
            lastName: 'MALDONADO',
          },
        },
      },
      {
        email: 'symoncatt@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 47,
          },
        },
        profile: {
          create: {
            firstName: 'SIMÓN',
            lastName: 'BONILLA',
          },
        },
      },
      {
        email: 'sociologo.dygt@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 48,
          },
        },
        profile: {
          create: {
            firstName: 'ENRIQUE',
            lastName: 'ORTIZ',
          },
        },
      },
      {
        email: 'oscarjforero83@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 49,
          },
        },
        profile: {
          create: {
            firstName: 'OSCAR',
            lastName: 'FORERO',
          },
        },
      },
      {
        email: 'jeaneth.montero@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 50,
          },
        },
        profile: {
          create: {
            firstName: 'JEANETH',
            lastName: 'MONTERO',
          },
        },
      },
      {
        email: 'miguelangel1989.33@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 51,
          },
        },
        profile: {
          create: {
            firstName: 'MIGUEL ANGEL',
            lastName: 'SOLORZANO BELIZARIO',
          },
        },
      },
      {
        email: 'joselarezve@gmail.com',
        password: hash,
        userRole: {
          create: {
            roleId: 3,
            enteId: 52,
          },
        },
        profile: {
          create: {
            firstName: 'JOSE RAFAEL',
            lastName: 'LAREZ RUBIO',
          },
        },
      },
    ]

    return usersData
  }
}
