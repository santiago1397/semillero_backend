import Excel from 'exceljs';
import Application from '@ioc:Adonis/Core/Application';
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'
import * as XLSX from 'xlsx'
import * as fetch from 'node-fetch';

process.on('uncaughtException', function (exception) {
  console.log(exception)
})


class MapExcel {
  static async map(file) {
    try {


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
      //var workbook1
      /* if (!(workbook1 = XLSX.readFile(file, {cellFormula: false}))) {
        return "error"
      } */
      var testwb = XLSX.read(file, { type: 'binary' })
      var ok = XLSX.writeFile(testwb, 'testChange.xlsx')

      const testeo = testwb.Sheets[testwb.SheetNames[0]]

      console.log(testeo)

      console.log("about to read")
      var workbook1 = XLSX.readFile(file)
      /* const response = await fetch("test.xlsx");
      const data1 = await file1.arrayBuffer(response);
      const workbook1 = XLSX.read(data1) */
      //console.log(workbook1)
      console.log("file done read")


      /* let worksheet = workbook1.Sheets[workbook1.SheetNames[0]] */
      console.log("taking workbook")
      let worksheet1 = workbook1.Sheets[workbook1.SheetNames[0]]
      const validation = worksheet1['A10'].v ? worksheet1['A10'].v : null
      if (validation !== '1.N°') {
        throw new Error('formato invalido')
      }
      console.log("workbook taken successfully")


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

      /* const range = XLSX.utils.decode_range(workbook1["!fullref"]);
      console.log(range) */

      console.log("about ot delete row")
      /* delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0)
      delete_row(worksheet1, 0) */

      console.log("rows deleted")

      console.log("is the problem here?")
      const dataXlsx: any = XLSX.utils.sheet_to_json(worksheet1)
      console.log("no, is not here")



      /* var cleanData = [] as any
      dataXlsx.forEach((item: any) => {
        cleanData.push(
          {
            codPlantel: item['2.Nombre de la Institución'] ? item['2.Nombre de la Institución'] : '',
            firstName: item['3.Nombres'] ? item['3.Nombres'] : '',
            lastName: item['4.Apellidos'] ? item['4.Apellidos'] : '',
            identity: item['5.Cédula de Identidad (si aplica)'] ? item['5.Cédula de Identidad (si aplica)'].toString() : '',
            age: item['6.Edad'] ? item['6.Edad'] : null,
            gender: item['7.Sexo (Masculino o Femenino)'] ? item['7.Sexo (Masculino o Femenino)'] : '',
            grade: item['8.Grado que cursa'] ? item['8.Grado que cursa'].toString() : '',
            activityMade: item['9.Actividad realizada'] ? item['9.Actividad realizada'] : '',
            //activityDate: item['10.Fecha en que fue realizada la actividad'].toString(), 
            activityPlace: item['11.Lugar de ocurrencia de la actividad'] ? item['11.Lugar de ocurrencia de la actividad'] : '',
            entityInCharge: item['12.Ente o institución encargada de la actividad'] ? item['12.Ente o institución encargada de la actividad'] : '',
            InChargeLastName: item['13.Apellidos encargado de la actividad realizada por el Ente'] ? item['13.Apellidos encargado de la actividad realizada por el Ente'] : '',
            InChargeName: item['14.Nombres del encargado de la actividad realizada por el Ente'] ? item['14.Nombres del encargado de la actividad realizada por el Ente'] : '',
            InChargeIdentity: item['15.Cédula de Identidad encargado de la actividad realizada por el Ente'] ? item['15.Cédula de Identidad encargado de la actividad realizada por el Ente'].toString() : '',
            InChargeCharge: item['16.Cargo dentro del Centro encargado de la actividad realizada por el Ente'] ? item['16.Cargo dentro del Centro encargado de la actividad realizada por el Ente'] : '',
            InChargePhone: item['17.Teléfono celular encargado de la actividad realizada por el Ente'] ? item['17.Teléfono celular encargado de la actividad realizada por el Ente'].toString() : '',
            InChargeLocalPhone: item['18.Teléfono local encargado de la actividad realizada por el Ente'] ? item['18.Teléfono local encargado de la actividad realizada por el Ente'].toString() : '',
            InChargeEmail: item['19.Email encargado de la actividad realizada por el Ente'] ? item['19.Email encargado de la actividad realizada por el Ente'] : '',
            InChargeProfession: item['20.Profesión encargado de la actividad realizada por el Ente'] ? item['20.Profesión encargado de la actividad realizada por el Ente'] : '',
            sizeShirt: item['Talla de camisa (REVISAR)'] ? item['Talla de camisa (REVISAR)'].toString() : '',
            disability: item['Posee algún tipo de discapacidad, enfermedad, alergía o condición'] ? item['Posee algún tipo de discapacidad, enfermedad, alergía o condición'] : '',
            intitutionDirection: item['Dirección de la institución'] ? item['Dirección de la institución'] : '',
            intitutionEstado: item['Estado (institución)'] ? item['Estado (institución)'] : '',
            intitutionMunicipio: item['Municipio (institución)'] ? item['Municipio (institución)'] : '',
            intitutionParroquia: item['Parroquia (Institución)'] ? item['Parroquia (Institución)'] : '',
            direction: item['Dirección de vivienda'] ? item['Dirección de vivienda'] : '',
            estado: item['Estado (Vivienda)'] ? item['Estado (Vivienda)'] : '',
            municipio: item['Municipio (Vivienda)'] ? item['Municipio (Vivienda)'] : '',
            parroquia: item['Parroquia (vivienda)'] ? item['Parroquia (vivienda)'] : '',
            localPhone: item['Teléfono local (Vivienda)'] ? item['Teléfono local (Vivienda)'].toString() : '',
            phone: item['Teléfono celular'] ? item['Teléfono celular'].toString() : '',
            firstNameResponsible: item['Nombres Representante'] ? item['Nombres Representante'] : '',
            lastNameResponsible: item['Apellidos Representante'] ? item['Apellidos Representante'] : '',
            identityResponsible: item['Cédula de Identidad representante'] ? item['Cédula de Identidad representante'].toString() : '',
            ageResponsible: item['Edad Representante'] ? item['Edad Representante'] : null,
            relationshipResponsible: item['Parentesco representante'] ? item['Parentesco representante'] : '',
            phoneResponsible: item['Teléfono celular representante'] ? item['Teléfono celular representante'].toString() : '',
            localPhoneResponsible: item['Teléfono laboral o alternativo representante'] ? item['Teléfono laboral o alternativo representante'].toString() : '',
            emailResponsible: item['Email representante'] ? item['Email representante'] : '',
            professionResponsible: item['Profesión y/o oficio representante'] ? item['Profesión y/o oficio representante'] : '',
          }

        )
      }) */
      //console.log(cleanData) 
      //const range = XLSX.utils.decode_range(workbook1["!fullref"]);
      //console.log(range)


      const test = [] as any

      for (var i = 2; i < dataXlsx.length - 1; i++) {
        test.push({
          codPlantel: dataXlsx[i].__EMPTY_1 ? dataXlsx[i].__EMPTY_1 : '',          
          firstName: dataXlsx[i].__EMPTY_2 ? dataXlsx[i].__EMPTY_2 : '',
          lastName: dataXlsx[i].__EMPTY_3 ? dataXlsx[i].__EMPTY_3 : '',
          identity: dataXlsx[i].__EMPTY_4 ? dataXlsx[i].__EMPTY_4.toString() : '',
          age: dataXlsx[i].__EMPTY_5 ? dataXlsx[i].__EMPTY_5 : null,
          gender: dataXlsx[i].__EMPTY_6 ? dataXlsx[i].__EMPTY_6 : '',
          grade: dataXlsx[i].__EMPTY_7 ? dataXlsx[i].__EMPTY_7.toString() : '',
          activityMade: dataXlsx[i].__EMPTY_8 ? dataXlsx[i].__EMPTY_8 : '',
          //activityDate: item['10.Fecha en que fue realizada la actividad'].toString(), 
          activityPlace: dataXlsx[i].__EMPTY_10 ? dataXlsx[i].__EMPTY_10 : '',
          entityInCharge: dataXlsx[i].__EMPTY_11 ? dataXlsx[i].__EMPTY_11 : '',
          InChargeLastName: dataXlsx[i].__EMPTY_12 ? dataXlsx[i].__EMPTY_12 : '',
          InChargeName: dataXlsx[i].__EMPTY_13 ? dataXlsx[i].__EMPTY_13 : '',
          InChargeIdentity: dataXlsx[i].__EMPTY_14 ? dataXlsx[i].__EMPTY_14.toString() : '',
          InChargeCharge: dataXlsx[i].__EMPTY_15 ? dataXlsx[i].__EMPTY_15 : '',
          InChargePhone: dataXlsx[i].__EMPTY_16 ? dataXlsx[i].__EMPTY_16.toString() : '',
          InChargeLocalPhone: dataXlsx[i].__EMPTY_17 ? dataXlsx[i].__EMPTY_17.toString() : '',
          InChargeEmail: dataXlsx[i].__EMPTY_18 ? dataXlsx[i].__EMPTY_18 : '',
          InChargeProfession: dataXlsx[i].__EMPTY_19 ? dataXlsx[i].__EMPTY_19 : '',
          sizeShirt: dataXlsx[i].__EMPTY_20 ? dataXlsx[i].__EMPTY_20.toString() : '',
          disability: dataXlsx[i].__EMPTY_21 ? dataXlsx[i].__EMPTY_21 : '',
          intitutionDirection: dataXlsx[i].__EMPTY_22 ? dataXlsx[i].__EMPTY_22 : '',
          intitutionEstado: dataXlsx[i].__EMPTY_23 ? dataXlsx[i].__EMPTY_23 : '',
          intitutionMunicipio: dataXlsx[i].__EMPTY_24 ? dataXlsx[i].__EMPTY_24 : '',
          intitutionParroquia: dataXlsx[i].__EMPTY_25 ? dataXlsx[i].__EMPTY_25 : '',
          direction: dataXlsx[i].__EMPTY_26 ? dataXlsx[i].__EMPTY_26 : '',
          estado: dataXlsx[i].__EMPTY_27 ? dataXlsx[i].__EMPTY_27 : '',
          municipio: dataXlsx[i].__EMPTY_28 ? dataXlsx[i].__EMPTY_28 : '',
          parroquia: dataXlsx[i].__EMPTY_29 ? dataXlsx[i].__EMPTY_29 : '',
          localPhone: dataXlsx[i].__EMPTY_30 ? dataXlsx[i].__EMPTY_30.toString() : '',
          phone: dataXlsx[i].__EMPTY_31 ? dataXlsx[i].__EMPTY_31.toString() : '',
          firstNameResponsible: dataXlsx[i].__EMPTY_32 ? dataXlsx[i].__EMPTY_32 : '',
          lastNameResponsible: dataXlsx[i].__EMPTY_33 ? dataXlsx[i].__EMPTY_33 : '',
          identityResponsible: dataXlsx[i].__EMPTY_34 ? dataXlsx[i].__EMPTY_34.toString() : '',
          ageResponsible: dataXlsx[i].__EMPTY_35 ? dataXlsx[i].__EMPTY_35 : null,
          relationshipResponsible: dataXlsx[i].__EMPTY_36 ? dataXlsx[i].__EMPTY_36 : '',
          phoneResponsible: dataXlsx[i].__EMPTY_37 ? dataXlsx[i].__EMPTY_37.toString() : '',
          localPhoneResponsible: dataXlsx[i].__EMPTY_38 ? dataXlsx[i].__EMPTY_38.toString() : '',
          emailResponsible: dataXlsx[i].__EMPTY_39 ? dataXlsx[i].__EMPTY_39 : '',
          professionResponsible: dataXlsx[i].__EMPTY_40 ? dataXlsx[i].__EMPTY_40 : '',
          
        })
      }


      return test;
  } catch(err) {
    let errorMessage = "Failed to do something exceptional";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    console.log(errorMessage);
  }
}

  static async export (filters) {
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