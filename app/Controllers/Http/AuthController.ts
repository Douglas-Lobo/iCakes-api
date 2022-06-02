import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { username, password } = request.all()
    const token = await auth.attempt(username, password, {
      expiresIn: '20 days',
    })
    return token
  }

  public async show({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    return user
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
