import Excel from 'exceljs';
import Application from '@ioc:Adonis/Core/Application';
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'


class MapExcel {
  static async map(file) {
    var workbook = new Excel.Workbook()
    workbook = await workbook.xlsx.readFile(file)
    let sheet = workbook.getWorksheet('DATA SEMILLEROS ESCUELA');
    let row = sheet.getColumn('B');
    let data = [] as any;
    row.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 11) {
        data.push(
          {
            codPlantel: sheet.getCell('B' + rowNumber).value,
            firstName: sheet.getCell('C' + rowNumber).value,
            lastName: sheet.getCell('D' + rowNumber).value,
            identity: sheet.getCell('E' + rowNumber).text,
            age: sheet.getCell('F' + rowNumber).value,
            gender: sheet.getCell('G' + rowNumber).value,
            grade: sheet.getCell('H' + rowNumber).value,
            activityMade: sheet.getCell('I' + rowNumber).value,
            /* activityDate: sheet.getCell('J' + rowNumber).value, */
            activityPlace: sheet.getCell('K' + rowNumber).value,
            entityInCharge: sheet.getCell('L' + rowNumber).value,
            InChargeLastName: sheet.getCell('M' + rowNumber).value,
            InChargeName: sheet.getCell('N' + rowNumber).value,
            InChargeIdentity: sheet.getCell('O' + rowNumber).text,
            InChargeCharge: sheet.getCell('P' + rowNumber).value,
            InChargePhone: sheet.getCell('Q' + rowNumber).text,
            InChargeLocalPhone: sheet.getCell('R' + rowNumber).text,
            InChargeEmail: typeof sheet.getCell('S' + rowNumber)? sheet.getCell('S' + rowNumber).text :sheet.getCell('S' + rowNumber).value,
            InChargeProfession: sheet.getCell('T' + rowNumber).value,
            sizeShirt: sheet.getCell('U' + rowNumber).text,
            disability: sheet.getCell('V' + rowNumber).value,
            intitutionDirection: sheet.getCell('W' + rowNumber).value,
            intitutionEstado: sheet.getCell('X' + rowNumber).value,
            intitutionMunicipio: sheet.getCell('Y' + rowNumber).value,
            intitutionParroquia: sheet.getCell('Z' + rowNumber).value,
            direction: sheet.getCell('AA' + rowNumber).value,
            estado: sheet.getCell('AB' + rowNumber).value,
            municipio: sheet.getCell('AC' + rowNumber).value,
            parroquia: sheet.getCell('AD' + rowNumber).value,
            localPhone: sheet.getCell('AE' + rowNumber).text,
            phone: sheet.getCell('AF' + rowNumber).text,
            firstNameResponsible: sheet.getCell('AG' + rowNumber).value,
            lastNameResponsible: sheet.getCell('AH' + rowNumber).value,
            identityResponsible: sheet.getCell('AI' + rowNumber).text,
            ageResponsible: sheet.getCell('AJ' + rowNumber).value,
            relationshipResponsible: sheet.getCell('AK' + rowNumber).value,
            phoneResponsible: sheet.getCell('AL' + rowNumber).text,
            localPhoneResponsible: sheet.getCell('AM' + rowNumber).text,
            emailResponsible: typeof sheet.getCell('AN' + rowNumber)? sheet.getCell('AN' + rowNumber).text :sheet.getCell('AN' + rowNumber).value,
            professionResponsible: sheet.getCell('AO' + rowNumber).value,
          }
        );
      }
    })
    return data;
  }

  static async export(filters) {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Hoja1");
    let font = { name: 'Times New Roman', size: 12 };
    worksheet.columns = [
      { header: "No", key: "id", width: 10, style: { font: font } },
      { header: "Nombre", key: "name", width: 40, style: { font: font } },
      { header: "Fecha", key: "date", width: 20, style: { font: font } },
      { header: "codPlantel", key: "codPlantel", width: 30, style: { font: font } },
    ];

    let data = await prisma.routesPlanned.findMany({
      where: filters,
      include: {
        activity: true,
        //site: true,
        //plantel: true,
        ente: true
      }
    })

    let rowSekolah = data.map(async item => {
      worksheet.addRow({
        id: item.id,
        name: item.name,
        date: item.datePlanned,
        //codPlantel: item.codPlantel
      })
    })

    worksheet.getCell('B1', 'C1').fill = {
      type: 'pattern', pattern: 'solid', fgColor: { argb: 'cccccc' }
    }

    await Promise.all(rowSekolah)
    let res = workbook.xlsx.writeFile(`${Application.tmpPath('storage/')}reporte.xlsx`)
  }
}

export default MapExcel;