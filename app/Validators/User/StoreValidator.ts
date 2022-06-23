import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim()]),
    username: schema.string([rules.trim(), rules.unique({ table: 'users', column: 'username' })]),
    email: schema.string([
      rules.trim(),
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.minLength(8)]),
  })

  public messages = {}
}
