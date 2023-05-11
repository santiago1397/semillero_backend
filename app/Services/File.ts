import Application from '@ioc:Adonis/Core/Application';

class File {
  static async upload(request) {
    const file = request.file('file', {
      size: '200mb',
      extnames: ['xls', 'xlsx', 'csv'],
    });

    if (!file) {
      return {status: false};
    }
    
    if (!file.isValid) {
      return file.errors
    }

    await file.move(Application.tmpPath('storage/'), {
      name: `${file.clientName}`,
      overwrite: true
    });
    return { status: true, filename: `${Application.tmpPath('storage/')}${file.clientName}` };
  }
}

export default File;