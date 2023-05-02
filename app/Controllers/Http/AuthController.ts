import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }

  public async register({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const user = await User.create({
      email: email,
      password: password
    });

    const token = await auth.use("api").login(user, {
      expiresIn: "10 days",
    });
    return token.toJSON();
  }

  public async recoverPassword({ request, auth }: HttpContextContract) {
    const email = request.input("email");
    const user = await User.findByOrFail('email', email);

    if(user){
      const token = await auth.use('api').generate(user, {
        expiresIn: '10 mins'
      })

      console.log('token:', token);
      
      let mailer = await new Mailer(user, 'Recuperación de acceso Sistema Correspondencia', true, 'recover', { user: { fullname: user.username }, url: `localhost:3333/reset-password/${token.tokenHash}` }, '', []).preview();
      return mailer;
    } else {
      return { message: 'El correo que has ingresado es incorrecto o no está registrado' };
    }
  }

  public async resetPassword({ request }: HttpContextContract){

  }
}