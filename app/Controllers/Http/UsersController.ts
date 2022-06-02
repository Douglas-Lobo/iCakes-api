import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = User.query().paginate(1, 10)
    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['email', 'username', 'password', 'photo'])
    const user = User.create(data)
    return user
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const user = User.findOrFail(id)
    return user
  }

  public async update({ params, request, auth, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    const data = request.only(['email', 'username', 'password'])
    const { id } = params
    const user = await User.findOrFail(id)
    if (user.id !== userAuth.id) {
      return response.unauthorized()
    }
    await user.merge(data).save()
    return user
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const userAuth = await auth.authenticate()
    const { id } = params
    const user = await User.findOrFail(id)
    if (user.id !== userAuth.id) {
      return response.unauthorized()
    }
    user.delete()

    return user.$isDeleted
  }
}
