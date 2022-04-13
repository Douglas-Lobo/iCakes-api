import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Ingredient } from 'App/Models'

export default class IngredientController {
  public async store({ request }: HttpContextContract) {
    const data = request.body()
    const ingredient = await Ingredient.create(data)
    return ingredient.$isPersisted
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params
    const data = request.all()
    const ingredient = await Ingredient.findOrFail(id)
    await ingredient.merge(data).save()
    return ingredient.$isPersisted
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    const ingredient = await Ingredient.findOrFail(id)
    await ingredient.delete()
    return ingredient.$isDeleted
  }
}
