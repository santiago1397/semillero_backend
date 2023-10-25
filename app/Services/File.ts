import Application from '@ioc:Adonis/Core/Application';

class File {
  static async upload(request) {
    /* console.log("request")
    console.log(request) */
    const file = request.file('file', {
      size: '200mb',
      extnames: ['xls', 'xlsx', 'csv'],
    });

    if (!file) {
      return { status: false };
    }

    if (!file.isValid) {
      return file.errors
    }

    //makePath
    await file.move(Application.tmpPath('/storage/'), {
      name: `${request.requestBody.name}.${file.extname}`,
      overwrite: true
    });
    /* console.log(file)  */
    return { status: true, filename: `${Application.tmpPath('/storage/')}${request.requestBody.name}.${file.extname}` };


  }

  static async download(response, request) {
    let filePath

    console.log(request.requestData.name)

    filePath = Application.tmpPath(`storage/${request.requestData.name}.xlsx`)

    return response.attachment(filePath);
  }
}

export default File;