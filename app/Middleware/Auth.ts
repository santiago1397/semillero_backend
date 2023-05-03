import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SetAuthorizationHeader {
  public async handle ({ request }: HttpContextContract, next: () => Promise<void>) {
    const token = request.headers().authorization;
    if(!token){
      throw new Error('Sin token');
    }
    await next()
  }
}