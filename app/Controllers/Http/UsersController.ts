import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { StoreValidator, UpdateValidator } from 'App/Validators/user'
// import Drive from '@ioc:Adonis/Core/Drive'
// import { FileValidator } from 'App/Validators/File'
// import application from '@ioc:Adonis/Core/Application'
import { User } from 'App/Models'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = User.query().paginate(1, 10)
    return users
  }

  public async store({ request }: HttpContextContract) {
    const email = request.body()
    const user = await User.create(email)

    // const { photo } = await request.validate(FileValidator)

    // await photo.moveToDisk(application.tmpPath('uploads'), {
    //   name: `${new Date().getTime()}_${photo.clientName}`,
    //   overwrite: true,
    // })
    // if (photo.fileName) {
    //   return await Drive.getUrl(photo.fileName)
    // }
    // const user = User.create(data)
    // return user
  }

  // public async storeData({ request }: HttpContextContract) {
  //   const data = await request.body()

  // }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    return User.findOrFail(id)
  }

  // public async update({ params, request, response }: HttpContextContract) {
  //   const { id } = params
  //   const data = await request.
  //   const user = await User.findOrFail(id)

  //   try {
  //     await user.merge(data).save()
  //   } catch (error) {
  //     return response.unprocessableEntity()
  //   }

  //   return user
  // }

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
