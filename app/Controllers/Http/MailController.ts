import Application from '@ioc:Adonis/Core/Application'
import Mailer from 'App/Mailers/Mailer'
import User from 'App/Models/User';
import File from 'App/Models/File';
import { unlink, rename } from 'fs/promises'
import FileStatus from 'App/Models/FileStatus';

export default class MailController {
  public async preview() {
    const user = await User.findOrFail(1);
    const files = [
      "1_arc_tgc.pdf",
    ];

    const from = 'SEDE CENTRAL/DIRECCION DE SISTEMAS'
    const to = 'SEDE METROPOLITANA/DIRECCION DE SISTEMAS'

    // Incrustamos el archivo en el correo
    let mailer = await new Mailer(user, 'Test preview message', false, '', {}, from, files).preview();

    for(let i = 0; i < files.length; i++){
      const file = await File.findByOrFail('name', files[i]);
      const fileStatus = await FileStatus.findByOrFail('file_id', file.id);
      fileStatus.merge({ 
        location: to,
        status: 1,
        updated_by: user.id, version : 
        fileStatus.version + 1 
      })
      .save();

      // Movemos el archivo de directorio al cual fue enviado
      await rename(
        Application.tmpPath(`storage/${from}/${files[i]}`), 
        Application.tmpPath(`storage/${to}/${files[i]}`)
      );
    }

    return mailer;
  }

  public async send() {
    const user = await User.findOrFail(1);
    const files = [
      "1_arc_tgc.pdf"
    ];

    const from = 'SEDE CENTRAL'

    let mailer = await new Mailer(user, 'Mensaje de prueba', true, 'test', { user: { fullname: 'Eloy Gonzalez'}, url: 'https://your-app.com/verification-url' }, from, files).send();
    return mailer;
  }
}
