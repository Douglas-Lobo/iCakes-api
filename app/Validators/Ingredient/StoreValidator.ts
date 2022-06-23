import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    initialAmount: schema.number(),
    cost: schema.number(),
    usedAmount: schema.number(),
    usedUnit: schema.enum(['g', 'l', 'mg', 'ml']),
  })
  public messages = {}
}
