import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User'
import Drive from '@ioc:Adonis/Core/Drive'
import application from '@ioc:Adonis/Core/Application'

export default class UsersController {
  public async show({ auth }: HttpContextContract) {
    return await auth.authenticate()
  }

  public async update({ request, auth }: HttpContextContract) {
    const { name, username, password, photo } = await request.validate(UpdateValidator)
    const user = await auth.authenticate()
    if (photo) {
      await photo.moveToDisk(application.tmpPath('uploads'), {
        name: `${new Date().getTime()}_${photo.clientName}`,
        overwrite: true,
      })
    }
    const photoPath = photo?.fileName ? await Drive.getUrl(photo.fileName) : user.photo
    return await user.merge({ name, username, password, photo: photoPath }).save()
  }

  public async destroy({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    await user.delete()
    return user.$isDeleted
  }
}
