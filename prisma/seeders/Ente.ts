import { prisma, PrismaSeederBase } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'

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

export default class EnteSeeder extends PrismaSeederBase {
  public static developmentOnly = false

  public async run() {
    // Load Entes on database
    const ente = await prisma.entes.createMany({ data: entesData, skipDuplicates: true })
  }
}
