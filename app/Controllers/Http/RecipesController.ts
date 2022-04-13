import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Recipe } from 'App/Models'

export default class RecipesController {
  public async index({ request }: HttpContextContract) {
    let { page } = request.qs()
    if (!page) {
      page = 1
    }
    return await Recipe.query().paginate(page, 2)
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name', 'description'])
    const recipe = await Recipe.create(data)
    return recipe.$isPersisted
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params
    const recipe = await Recipe.findOrFail(id)
    return recipe
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params
    const data = request.only(['name', 'description'])
    const recipe = await Recipe.findOrFail(id)
    await recipe.merge(data).save()
    return recipe.$isPersisted
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    const recipe = await Recipe.findOrFail(id)
    await recipe.delete()
    return recipe.$isDeleted
  }
}
