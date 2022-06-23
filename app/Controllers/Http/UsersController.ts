import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/user'
import { User } from 'App/Models'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = User.query().paginate(1, 10)
    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = User.create(data)
    return user
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    return User.findOrFail(id)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const { id } = params
    const user = await User.findOrFail(id)
    try {
      await user.merge(data).save()
    } catch (error) {
      return response.unprocessableEntity()
    }

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
