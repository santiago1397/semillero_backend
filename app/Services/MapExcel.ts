import Excel from 'exceljs';
import Application from '@ioc:Adonis/Core/Application';
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'
import * as XLSX from 'xlsx'


class MapExcel {
  static async map(file) {
    /* console.log(file)
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
            activityDate: sheet.getCell('J' + rowNumber).value, 
            activityPlace: sheet.getCell('K' + rowNumber).value,
            entityInCharge: sheet.getCell('L' + rowNumber).value,
            InChargeLastName: sheet.getCell('M' + rowNumber).value,
            InChargeName: sheet.getCell('N' + rowNumber).value,
            InChargeIdentity: sheet.getCell('O' + rowNumber).text,
            InChargeCharge: sheet.getCell('P' + rowNumber).value,
            InChargePhone: sheet.getCell('Q' + rowNumber).text,
            InChargeLocalPhone: sheet.getCell('R' + rowNumber).text,
            InChargeEmail: typeof sheet.getCell('S' + rowNumber) ? sheet.getCell('S' + rowNumber).text : sheet.getCell('S' + rowNumber).value,
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
            emailResponsible: typeof sheet.getCell('AN' + rowNumber) ? sheet.getCell('AN' + rowNumber).text : sheet.getCell('AN' + rowNumber).value,
            professionResponsible: sheet.getCell('AO' + rowNumber).value,
          }
        );
      }
    }) */

    //prueba de xlsx
    const file1 = file;
    /* const data1 = await file1.arrayBuffer(); */
    const workbook1 = XLSX.readFile(file)
    //const workbook1 = XLSX.read(file, {type:'string'})
    //console.log(workbook1)

    /* let worksheet = workbook1.Sheets[workbook1.SheetNames[0]] */
    let worksheet1 = workbook1.Sheets[workbook1.SheetNames[0]]
    const validation = worksheet1['A10'].v ? worksheet1['A10'].v  : null
    if(validation !== '1.N°'){
      throw new Error('formato invalido')
    }

    //console.log(worksheet1)

    // delete a specific row
    function ec(r, c) {
      return XLSX.utils.encode_cell({ r: r, c: c });
    }
    function delete_row(ws, row_index) {
      var variable = XLSX.utils.decode_range(ws["!ref"])
      for (var R = row_index; R < variable.e.r; ++R) {
        for (var C = variable.s.c; C <= variable.e.c; ++C) {
          ws[ec(R, C)] = ws[ec(R + 1, C)];
        }
      }
      variable.e.r--
      ws['!ref'] = XLSX.utils.encode_range(variable.s, variable.e);
    }

    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    delete_row(worksheet1, 0)
    //delete_row(worksheet1, 0)

    const dataXlsx = XLSX.utils.sheet_to_json(worksheet1)

    /* console.log(worksheet1)
    console.log(dataXlsx) 
    console.log(validation) */

    var cleanData = [] as any
    dataXlsx.forEach((item : any) => {
      cleanData.push(
        {
          codPlantel: item['2.Nombre de la Institución']? item['2.Nombre de la Institución']: '',
          firstName: item['3.Nombres']? item['3.Nombres']: '',
          lastName: item['4.Apellidos']? item['4.Apellidos']:'',
          identity: item['5.Cédula de Identidad (si aplica)']? item['5.Cédula de Identidad (si aplica)'].toString() : '',
          age: item['6.Edad']? item['6.Edad']: null,
          gender: item['7.Sexo (Masculino o Femenino)']? item['7.Sexo (Masculino o Femenino)']: '',
          grade: item['8.Grado que cursa']? item['8.Grado que cursa']:'',
          activityMade: item['9.Actividad realizada']? item['9.Actividad realizada']:'',
          /* activityDate: item['10.Fecha en que fue realizada la actividad'].toString(), */
          activityPlace: item['11.Lugar de ocurrencia de la actividad']? item['11.Lugar de ocurrencia de la actividad']: '',
          entityInCharge: item['12.Ente o institución encargada de la actividad']? item['12.Ente o institución encargada de la actividad']: '',
          InChargeLastName: item['13.Apellidos encargado de la actividad realizada por el Ente']? item['13.Apellidos encargado de la actividad realizada por el Ente']: '',
          InChargeName: item['14.Nombres del encargado de la actividad realizada por el Ente']? item['14.Nombres del encargado de la actividad realizada por el Ente']: '',
          InChargeIdentity: item['15.Cédula de Identidad encargado de la actividad realizada por el Ente']?item['15.Cédula de Identidad encargado de la actividad realizada por el Ente'].toString():'',
          InChargeCharge: item['16.Cargo dentro del Centro encargado de la actividad realizada por el Ente']? item['16.Cargo dentro del Centro encargado de la actividad realizada por el Ente']:'',
          InChargePhone: item['17.Teléfono celular encargado de la actividad realizada por el Ente']? item['17.Teléfono celular encargado de la actividad realizada por el Ente'].toString():'',
          InChargeLocalPhone: item['18.Teléfono local encargado de la actividad realizada por el Ente']?item['18.Teléfono local encargado de la actividad realizada por el Ente'].toString(): '',
          InChargeEmail: item['19.Email encargado de la actividad realizada por el Ente']? item['19.Email encargado de la actividad realizada por el Ente']: '',
          InChargeProfession: item['20.Profesión encargado de la actividad realizada por el Ente']? item['20.Profesión encargado de la actividad realizada por el Ente']: '',
          sizeShirt:item['Talla de camisa (REVISAR)']?item['Talla de camisa (REVISAR)'].toString():'' ,
          disability: item['Posee algún tipo de discapacidad, enfermedad, alergía o condición']? item['Posee algún tipo de discapacidad, enfermedad, alergía o condición']: '',
          intitutionDirection: item['Dirección de la institución']? item['Dirección de la institución']: '',
          intitutionEstado:item['Estado (institución)']? item['Estado (institución)']: '' ,
          intitutionMunicipio: item['Municipio (institución)']? item['Municipio (institución)']: '',
          intitutionParroquia: item['Parroquia (Institución)']? item['Parroquia (Institución)'] : '',
          direction: item['Dirección de vivienda']? item['Dirección de vivienda']: '',
          estado:item['Estado (Vivienda)']? item['Estado (Vivienda)']:'' ,
          municipio: item['Municipio (Vivienda)']? item['Municipio (Vivienda)']: '',
          parroquia: item['Parroquia (vivienda)']? item['Parroquia (vivienda)']: '',
          localPhone: item['Teléfono local (Vivienda)']? item['Teléfono local (Vivienda)'].toString() : '',
          phone: item['Teléfono celular']? item['Teléfono celular'].toString(): '',
          firstNameResponsible: item['Nombres Representante']? item['Nombres Representante']:'',
          lastNameResponsible: item['Apellidos Representante']? item['Apellidos Representante']: '',
          identityResponsible: item['Cédula de Identidad representante']? item['Cédula de Identidad representante'].toString():'',
          ageResponsible: item['Edad Representante']? item['Edad Representante']: null,
          relationshipResponsible: item['Parentesco representante']? item['Parentesco representante']:'',
          phoneResponsible: item['Teléfono celular representante']? item['Teléfono celular representante'].toString():'',
          localPhoneResponsible: item['Teléfono laboral o alternativo representante']? item['Teléfono laboral o alternativo representante'].toString(): '',
          emailResponsible: item['Email representante']?item['Email representante']:'',
          professionResponsible: item['Profesión y/o oficio representante']? item['Profesión y/o oficio representante']: '',
        }

      )
    })
     /* console.log(cleanData)  */
     //const range = XLSX.utils.decode_range(workbook1["!fullref"]);
     //console.log(range)

    return cleanData;
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