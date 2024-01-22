import Excel from 'exceljs';
import Application from '@ioc:Adonis/Core/Application';
import { prisma } from '@ioc:Adonis/Addons/Prisma'
import { Prisma } from '@prisma/client'
import * as XLSX from 'xlsx'




class MapExcel {
  static async map(file, enteId) {
    try {

      var workbook1 = XLSX.readFile(file)
      let worksheet1 = workbook1.Sheets[workbook1.SheetNames[0]]


      const validation = worksheet1['A10'].v ? worksheet1['A10'].v : null
      if (validation !== '1.N°') {
        throw new Error('formato invalido')
      }  

      
      const dataXlsx: any = XLSX.utils.sheet_to_json(worksheet1)
      /* console.log(dataXlsx) */
      const test = [] as any
      for (var i = 2; i < dataXlsx.length ; i++) {
        test.push({
          enteId: enteId,
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

      /* for(var i=0; i<test.length;i++){
        console.log(test[i].age)
        console.log(test[i].ageResponsible)
      } */
      
      return test;
  } catch(err) {
    console.log(err)
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