import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { username, password } = await request.validate(StoreValidator)
    const token = await auth.attempt(username, password, {
      expiresIn: '20 days',
    })
    return token
  }

  public async show({ auth }: HttpContextContract) {
    return await auth.authenticate()
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
