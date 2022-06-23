import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([rules.trim()]),
    description: schema.string.optional([rules.trim()]),
    profitPercent: schema.number(),
  })

  public messages = {}
}
