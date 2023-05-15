import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'

export default class Mailer extends BaseMailer {
  constructor (
    private email: string,
    private title: string,
    private hasInterface?: boolean,
    private type?: string,
    private data?: object,
    private location?: string,
    private hasAttached?: Array<string>
    ) {
      super()
  }

  public prepare(message: MessageContract) {
    message
    .subject(this.title)
    .from(Env.get('SMTP_USERNAME'))
    .to(this.email)
    
    if(this.hasInterface){
      switch(this.type){
        case 'recover': {
          message.htmlView('password_recovery', this.data);
          break;
        },
        case 'report': {
          message.htmlView('report', this.data);
          break;
        }
      }
    }

    if(this.hasAttached){
      for(let i = 0; i < this.hasAttached.length; i++){
        message.attach(Application.tmpPath(`${this.location}/${this.hasAttached[i]}`))
      }
    }
  }
}
