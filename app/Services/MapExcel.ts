import Excel from 'exceljs';
import Application from '@ioc:Adonis/Core/Application';
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'


class MapExcel {
  static async map(file) {
    var workbook = new Excel.Workbook()
    workbook = await workbook.xlsx.readFile(file)
    let sheet = workbook.getWorksheet('Hoja1');
    let row = sheet.getColumn('C');
    let data = [] as any;
    row.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 2) {
        data.push(
          {
            codPlantel: sheet.getCell('B' + rowNumber).value,
            lastName: sheet.getCell('C' + rowNumber).value,
            firstName: sheet.getCell('D' + rowNumber).value,
            identity: sheet.getCell('E' + rowNumber).value,
            birthDate: sheet.getCell('F' + rowNumber).value,
            age: sheet.getCell('G' + rowNumber).value,
            gender: sheet.getCell('H' + rowNumber).value,
            grade: sheet.getCell('I' + rowNumber).value,
            sizeShirt: sheet.getCell('J' + rowNumber).value,
            disability: sheet.getCell('K' + rowNumber).value,
            alergie: sheet.getCell('L' + rowNumber).value,
            typeBlood: sheet.getCell('M' + rowNumber).value,
            vaccinatedCovid: sheet.getCell('N' + rowNumber).value,
            direction: sheet.getCell('O' + rowNumber).value,
            estado: sheet.getCell('P' + rowNumber).value,
            municipio: sheet.getCell('Q' + rowNumber).value,
            parroquia: sheet.getCell('R' + rowNumber).value,
            localPhone: sheet.getCell('S' + rowNumber).value,
            phone: sheet.getCell('T' + rowNumber).value,
            firstNameResponsible: sheet.getCell('U' + rowNumber).value,
            lastNameResponsible: sheet.getCell('V' + rowNumber).value,
            identityResponsible: sheet.getCell('W' + rowNumber).value,
            ageResponsible: sheet.getCell('X' + rowNumber).value,
            relationshipResponsible: sheet.getCell('Y' + rowNumber).value,
            phoneResponsible: sheet.getCell('Z' + rowNumber).value,
            localPhoneResponsible: sheet.getCell('AA' + rowNumber).value,
            emailResponsible: sheet.getCell('AB' + rowNumber).value,
            professionResponsible: sheet.getCell('AC' + rowNumber).value,
            directionjobResponsible: sheet.getCell('AD' + rowNumber).value,
            agreeParticipes: sheet.getCell('AE' + rowNumber).value,
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
        site: true,
        plantel: true,
        ente: true
      }
    })

    let rowSekolah = data.map(async item => {
      worksheet.addRow({
        id: item.id,
        name: item.name,
        date: item.datePlanned,
        codPlantel: item.codPlantel
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