import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class FileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    photo: schema.file({ size: '5mb', extnames: ['jpg', 'gif', 'png'] }),
  })

  public messages = {}
}
