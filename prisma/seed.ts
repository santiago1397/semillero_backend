import bcrypt from 'bcrypt'
import { PrismaClient, type Prisma } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query', 'info'] })

const modulesData: Prisma.ModulesCreateInput[] = [
  {
    name: 'Entes',
    path: '/dashboard/entes',
  },
  {
    name: 'Sitios',
    path: '/dashboard/sitios',
  },
  {
    name: 'Instituciones',
    path: '/dashboard/instituciones',
  },
  {
    name: 'Usuarios',
    path: '/dashboard/usuarios',
  },
  {
    name: 'Perfil',
    path: '/dashboard/perfil',
  },
  {
    name: 'Roles',
    path: '/dashboard/roles',
  },
  {
    name: 'Actividades',
    path: '/dashboard/actividades',
  },
]

const responsabilitiesData: Prisma.ResponsabilitiesCreateInput[] = [
  { name: 'Comunicación y Disfusión' },
  { name: 'Rutas Científicas' },
  { name: 'Ciclo formativo' },
  { name: 'Enlace zona Educativa' },
  { name: 'Responsable ente' },
  { name: 'Responsable por Infocentro' },
]

const relationShipData: Prisma.RelationshipCreateInput[] = [
  { name: 'MADRE' },
  { name: 'PADRE' },
  { name: 'ABUELO' },
  { name: 'ABUELA' },
  { name: 'TIO' },
  { name: 'TIA' },
  { name: 'HERMANO' },
  { name: 'HERMANA' },
  { name: 'PRIMO' },
  { name: 'PRIMA' },
]

const typesSitesData: Prisma.TypeSitesCreateInput[] = [
  { name: 'ECOLÓGICO' },
  { name: 'PRODUCCIÓN E INVESTIGACIÓN' },
  { name: 'INVESTIGACIÓN' },
  { name: 'FORMACIÓN' },
  { name: 'INVESTIGACIÓN Y PRODUCCIÓN' },
  { name: 'PRODUCCIÓN' },
]

const entesData: Prisma.EntesCreateInput[] = [
  {
    name: 'MINISTERIO DEL PODER POPULAR PARA CIENCIA Y TECNOLOGIA',
    acronim: 'MINCYT',
  },
  {
    name: 'AGENCIA BOLIVARIANA PARA ACTIVIDADES ESPACIALES',
    acronim: 'ABAE',
  },
  {
    name: 'CENTRO NACIONAL DE DESARROLLO E INVESTIGACIÓN DE TELECOMUNICACIONES',
    acronim: 'CENDIT',
  },
  {
    name: 'CENTRO NACIONAL DE DESARROLLO E INVESTIGACIÓN EN TECNOLOGÍAS LIBRES',
    acronim: 'CENDITEL',
  },
  {
    name: 'CENTRO NACIONAL DE TECNOLOGÍA DE LA INFORMACIÓN',
    acronim: 'CNTI',
  },
  {
    name: 'COMISIÓN NACIONAL DE LAS TECNOLOGÍAS DE INFORMACIÓN',
    acronim: 'CONATI',
  },
  {
    name: 'COMPAÑÍA ANÓNIMA NACIONAL TELÉFONOS DE VENEZUELA',
    acronim: 'CANTV',
  },
  {
    name: 'CORPORACIÓN SOCIALISTA DE LAS TELECOMUNICACIONES Y SERVICIOS POSTALES, C.A.',
    acronim: 'CORPOSTEL',
  },
  {
    name: 'SUPERINTENDENCIA DE SERVICIOS DE CERTIFICACIÓN ELECTRÓNICA',
    acronim: 'SUSCERTE',
  },
  {
    name: 'TELECOM VENEZUELA, C.A.',
    acronim: 'TELECOM',
  },
  {
    name: 'TELECOMUNICACIONES GRAN CARIBE, S.A.',
    acronim: 'TGC',
  },
  {
    name: 'TELECOMUNICACIONES MOVILNET, C.A.',
    acronim: 'MOVILNET',
  },
  {
    name: 'FONDO DE INVESTIGACIÓN Y DESARROLLO DE LAS TELECOMUNICACIONES',
    acronim: 'FIDETEL',
  },
  {
    name: 'ACADEMIA DE CIENCIAS AGRÍCOLAS DE VENEZUELA',
    acronim: 'ACAV',
  },
  {
    name: 'CENTRO DE INVESTIGACIONES DE ASTRONOMÍA "FRANCISCO J. DUARTE"',
    acronim: 'CIDA',
  },
  {
    name: 'CENTRO DE INVESTIGACIONES DEL ESTADO PARA LA PRODUCCIÓN EXPERIMENTAL AGROINDUSTRIAL',
    acronim: 'CIEPE',
  },
  {
    name: 'CENTRO NACIONAL DE INVESTIGACIÓN Y CERTIFICACIÓN EN VIVIENDA, HABITAT Y DESARROLLO URBANO',
    acronim: 'CENVIH',
  },
  {
    name: 'CENTRO NACIONAL DE TECNOLOGÍA QUÍMICA',
    acronim: 'CNTQ',
  },
  {
    name: 'CORPORACIÓN PARA EL DESARROLLO CIENTÍFICO Y TECNOLÓGICO, S.A.',
    acronim: 'CODECYT',
  },
  {
    name: 'FONDO NACIONAL DE CIENCIA, TECNOLOGÍA E INNOVACIÓN',
    acronim: 'FONACIT',
  },
  {
    name: 'INSTITUTO DE ESTUDIOS AVANZADOS',
    acronim: 'IDEA',
  },
  {
    name: 'FUNDACIÓN INSTITUTO DE INGENIERÍA PARA LA INVESTIGACIÓN Y DESARROLLO TECNOLÓGICO',
    acronim: 'FIIDT',
  },
  {
    name: 'INSTITUTO VENEZOLANO DE INVESTIGACIONES CIENTÍFICAS',
    acronim: 'IVIC',
  },
  {
    name: 'INSTITUTO ZULIANO DE INVESTIGACIONES TECNOLÓGICAS',
    acronim: 'INZIT',
  },
  {
    name: 'OBSERVATORIO NACIONAL DE CIENCIA, TECNOLOGÍA E INNOVACIÓN',
    acronim: 'ONCTI',
  },
  {
    name: 'ZONA LIBRE CULTURAL, CIENTÍFICA Y TECNOLÓGICA DEL ESTADO MÉRIDA',
    acronim: 'ZOLCCYT',
  },
  {
    name: 'TV	FUNDACIÓN CONCIENCIA TV',
    acronim: 'CONCIENCIA',
  },
  {
    name: 'FUNDACIÓN INFOCENTRO',
    acronim: 'INFOCENTRO',
  },
  {
    name: 'CANAIMA	INDUSTRIAS CANAIMA, C.A.',
    acronim: 'INDUSTRIAS',
  },
  {
    name: 'INSTITUTO POSTAL TELEGRÁFICO DE VENEZUELA',
    acronim: 'IPOSTEL',
  },
  {
    name: 'FUNDACITE AMAZONAS',
    acronim: 'FUNDACITE AMA',
  },
  {
    name: 'FUNDACITE ANZOÁTEGUI',
    acronim: 'FUNDACITE ANZ',
  },
  {
    name: 'FUNDACITE APURE',
    acronim: 'FUNDACITE APU',
  },
  {
    name: 'FUNDACITE ARAGUA',
    acronim: 'FUNDACITE ARA',
  },
  {
    name: 'FUNDACITE BARINAS',
    acronim: 'FUNDACITE BAR',
  },
  {
    name: 'FUNDACITE BOLÍVAR',
    acronim: 'FUNDACITE BOL',
  },
  {
    name: 'FUNDACITE CARABOBO',
    acronim: 'FUNDACITE CAR',
  },
  {
    name: 'FUNDACITE COJEDES',
    acronim: 'FUNDACITE COJ',
  },
  {
    name: 'FUNDACITE DELTA AMACURO',
    acronim: 'FUNDACITE DAC',
  },
  {
    name: 'FUNDACITE FALCÓN',
    acronim: 'FUNDACITE FAL',
  },
  {
    name: 'FUNDACITE GUÁRICO',
    acronim: 'FUNDACITE GUA',
  },
  {
    name: 'FUNDACITE LARA',
    acronim: 'FUNDACITE LAR',
  },
  {
    name: 'FUNDACITE MÉRIDA',
    acronim: 'FUNDACITE MER',
  },
  {
    name: 'FUNDACITE MIRANDA',
    acronim: 'FUNDACITE MIR',
  },
  {
    name: 'FUNDACITE MONAGAS',
    acronim: 'FUNDACITE MON',
  },
  {
    name: 'FUNDACITE NUEVA ESPARTA',
    acronim: 'FUNDACITE NVE',
  },
  {
    name: 'FUNDACITE PORTUGUESA',
    acronim: 'FUNDACITE POR',
  },
  {
    name: 'FUNDACITE SUCRE',
    acronim: 'FUNDACITE SUC',
  },
  {
    name: 'FUNDACITE TÁCHIRA',
    acronim: 'FUNDACITE TAC',
  },
  {
    name: 'FUNDACITE TRUJILLO',
    acronim: 'FUNDACITE TRU',
  },
  {
    name: 'FUNDACITE YARACUY',
    acronim: 'FUNDACITE YAR',
  },
  {
    name: 'FUNDACITE ZULIA',
    acronim: 'FUNDACITE ZUL',
  },
]

const rolesData: Prisma.RolesCreateInput[] = [
  {
    name: 'ROOT',
    description: 'Rol para la administracion del sistema y su servidor',
  },
  {
    name: 'Administrador',
    description: 'Rol para la administracion del sistema',
  },
  {
    name: 'Presidente',
    description: 'Rol para la gestion del fundacite o ente adscrito estadal',
  },
  {
    name: 'Delegado',
    description: 'Rol asignado por el presidente del fundacite o del ente adscrito estadal',
  },
]

const activitiesData: Prisma.ActivitiesCreateInput[] = [
  { name: 'Rutas Cientificas' },
  { name: 'Plan de masificacion' },
  { name: 'Teatro cientifico' },
]

const usersData: Prisma.UsersCreateInput[] = [
  {
    email: '******************',
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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
    password: bcrypt.hashSync('123456', 12),
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

const professionsData: Prisma.ProfessionsCreateInput[] = [
  {
    name: 'No definido',
  },
]

const responsabilitiesEntesData: Prisma.ResponsiblesEntesCreateManyInput[] = [
  {
    enteId: 31,
    responsabilityId: 5,
    professionId: 1,
    firstName: 'JEFERSON',
    lastName: 'CAMEJO',
    identity: '16512897',
    gender: 1,
    birthDate: '',
    email: 'camejo1984@gmail.com',
    phone: '',
  },
  {
    enteId: 32,
    responsabilityId: 5,
    professionId: 1,
    firstName: 'VICTOR',
    lastName: 'HUGO',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
    email: 'camejo1984@gmail.com',
  },
  {
    enteId: 33,
    responsabilityId: 5,
    professionId: 1,
    firstName: 'RONNY JOSE',
    lastName: 'YEGUEZ MASS',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
    email: 'ronnyeguez@gmail.com',
  },
  {
    enteId: 34,
    responsabilityId: 5,
    professionId: 1,
    email: 'pedromerentes@gmail.com',
    firstName: 'PEDRO',
    lastName: 'MERENTES',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 35,
    responsabilityId: 5,
    professionId: 1,
    email: 'mfutbarinas@gmail.com',
    firstName: 'ZAIRA',
    lastName: 'VIVAS',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 36,
    responsabilityId: 5,
    professionId: 1,
    email: 'presidencia.fundacitebolivar@gmail.com',
    firstName: 'LUIS',
    lastName: 'CÁRDENAS',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 37,
    responsabilityId: 5,
    professionId: 1,
    email: 'presidentefundacite@gmail.com',
    firstName: 'EFRAÍN',
    lastName: 'MARÍN',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 38,
    responsabilityId: 5,
    professionId: 1,
    email: 'utfundacitecojedes@gmail.com',
    firstName: 'PABLO',
    lastName: 'RODRIGUEZ',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 39,
    responsabilityId: 5,
    professionId: 1,
    email: 'presidenciafundacitedelta@gmail.com',
    firstName: 'JHONNY',
    lastName: 'GOMEZ',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 40,
    responsabilityId: 5,
    professionId: 1,
    email: 'yugre202003@gmail.com',
    firstName: 'JUOGREIDIN',
    lastName: 'CERERO',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 41,
    responsabilityId: 5,
    professionId: 1,
    email: 'jjmadridh@gmail.com',
    firstName: 'JIM JOSE',
    lastName: 'MADRID',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 42,
    responsabilityId: 5,
    professionId: 1,
    email: 'presidenciafundacitelara1@gmail.com',
    firstName: 'ANGÉLICA',
    lastName: 'GONZALEZ',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 43,
    responsabilityId: 5,
    professionId: 1,
    email: 'mmora.fundacite@gmail.com',
    firstName: 'MARIA NATHALY',
    lastName: 'MORA',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 44,
    responsabilityId: 5,
    professionId: 1,
    email: 'hector.constant@gmail.com',
    firstName: 'HECTOR',
    lastName: 'CONSTANT',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 45,
    responsabilityId: 5,
    professionId: 1,
    email: 'ariamandrea26@gmail.com',
    firstName: 'MARIA',
    lastName: 'HERNANDEZ',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 46,
    responsabilityId: 5,
    professionId: 1,
    email: 'presidenciafundacitene@gmail.com',
    firstName: 'VANESSA',
    lastName: 'MALDONADO',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 47,
    responsabilityId: 5,
    professionId: 1,
    email: 'symoncatt@gmail.com',
    firstName: 'SIMÓN',
    lastName: 'BONILLA',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 48,
    responsabilityId: 5,
    professionId: 1,
    email: 'sociologo.dygt@gmail.com',
    firstName: 'ENRIQUE',
    lastName: 'ORTIZ',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 49,
    responsabilityId: 5,
    professionId: 1,
    email: 'oscarjforero83@gmail.com',
    firstName: 'OSCAR',
    lastName: 'FORERO',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 50,
    responsabilityId: 5,
    professionId: 1,
    email: 'jeaneth.montero@gmail.com',
    firstName: 'JEANETH',
    lastName: 'MONTERO',
    identity: '',
    phone: '',
    gender: 0,
    birthDate: '',
  },
  {
    enteId: 51,
    responsabilityId: 5,
    professionId: 1,
    email: 'miguelangel1989.33@gmail.com',
    firstName: 'MIGUEL ANGEL',
    lastName: 'SOLORZANO BELIZARIO',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
  {
    enteId: 52,
    responsabilityId: 5,
    professionId: 1,
    email: 'joselarezve@gmail.com',
    firstName: 'JOSE RAFAEL',
    lastName: 'LAREZ RUBIO',
    identity: '',
    phone: '',
    gender: 1,
    birthDate: '',
  },
]

const modulesPerRolesData: Prisma.ModulesRolesCreateManyInput[] = [
  {
    roleId: 1,
    moduleId: 1,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 2,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 3,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 4,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 5,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 6,
    assignedBy: 0,
  },
  {
    roleId: 1,
    moduleId: 7,
    assignedBy: 0,
  },
]

// Start Transaction
async function main() {
  console.log(`Start seeding ...`)

  // Load responsabilities on database
  await prisma.responsabilities.createMany({ data: responsabilitiesData, skipDuplicates: true })

  // Load relationships on database
  await prisma.relationship.createMany({ data: relationShipData, skipDuplicates: true })

  // Load Modules on database
  await prisma.modules.createMany({ data: modulesData, skipDuplicates: true })

  // Load Activities on database
  await prisma.activities.createMany({ data: activitiesData, skipDuplicates: true })

  // Load TypesSites on database
  await prisma.typeSites.createMany({ data: typesSitesData, skipDuplicates: true })

  // Load Entes on database
  await prisma.entes.createMany({ data: entesData, skipDuplicates: true })

  // Load roles on database
  await prisma.roles.createMany({ data: rolesData, skipDuplicates: true })

  // Load professions on database
  await prisma.professions.createMany({ data: professionsData, skipDuplicates: true })

  // Load user on database
  for (const u of usersData) {
    const user = await prisma.users.create({ data: u })
    console.log(`User created with id: ${user.id}`)
  }

  // Load Permissios on database
  await prisma.modulesRoles.createMany({ data: modulesPerRolesData, skipDuplicates: true })

  // Load responsabilities on database
  await prisma.responsiblesEntes.createMany({ data: responsabilitiesEntesData })
  console.log(`Seeding finished...`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
