import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    username: schema.string([rules.trim(), rules.unique({ table: 'users', column: 'username' })]),
    password: schema.string([rules.trim(), rules.minLength(8)]),
  })
  public messages = {}
}
