import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/Register'
import { User, UserKey } from 'App/Models'
import { faker } from '@faker-js/faker'
import Drive from '@ioc:Adonis/Core/Drive'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl } = await request.validate(StoreValidator)
      const user = new User()
      user.useTransaction(trx).email = email

      const key = faker.datatype.uuid()
      await user.related('UserKey').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await Mail.send((msg) => {
        msg.to(email)
        msg.from('cadastro@icakes.com.br', 'iCakes')
        msg.subject('Confirmação de cadastro')
        msg.htmlView('emails/register', {
          link,
        })
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKey = params.id
    const key = await UserKey.findByOrFail('key', userKey)
    return await key.related('user').query().firstOrFail()
  }

  public async update({ request, params, response }: HttpContextContract) {
    const key = params.id
    const { username, name, password } = await request.validate(UpdateValidator)
    const photo = await Drive.getUrl('user-default.png')
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    await userKey.delete()
    await user.merge({ username, name, password, photo }).save()
    return response.ok({ message: 'Ok' })
  }
}
