import Excel from 'exceljs';

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
}

export default MapExcel;