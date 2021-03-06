import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim()]),
    username: schema.string([rules.trim()]),
    password: schema.string([rules.trim(), rules.minLength(8)]),
    photo: schema.file.optional({ size: '3mb', extnames: ['jpg', 'gif', 'png'] }),
  })

  public messages = {}
}
