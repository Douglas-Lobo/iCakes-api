import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator, UpdateValidator } from 'App/Validators/ForgotPassword'
import { User, UserKey } from 'App/Models'
import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class ForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)
    const user = await User.findByOrFail('email', email)
    const userHasKey = await UserKey.findBy('user_id', user.id)
    if (userHasKey) {
      await userHasKey.delete()
    }
    const key = faker.datatype.uuid()
    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`
    await user.related('UserKey').create({ key })

    await Mail.send((msg) => {
      msg.to(email)
      msg.from('contato@icakes.com.br', 'iCakes')
      msg.subject('Alteração de Senha')
      msg.htmlView('emails/forgotPassword', { link, name: user.firstName })
    })
  }

  public async show({ params }: HttpContextContract) {
    const { key } = params
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    return user.firstName
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { key } = params
    const data = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()
    await user.merge(data).save()
    await userKey.delete()
    response.ok({ message: 'ok' })
  }
}
