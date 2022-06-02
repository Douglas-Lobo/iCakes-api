import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Budget } from 'App/Models'
import { updateBudgetValues } from 'App/Utils/Calculations'

export default class BudgetsController {
  public async index({ auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const budgets = Budget.query().where('user_id', user.id).paginate(1, 10)
    return budgets
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = request.only(['name', 'description', 'profitPercent'])
    return await Budget.create({ userId: user.id, ...data })
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const { id } = params
    const user = await auth.authenticate()
    let data = request.body()
    const budget = await Budget.query().where('id', id).andWhere('user_id', user.id).firstOrFail()

    if (budget.profitPercent !== data.profitPercent) {
      const newValues = updateBudgetValues(
        data.profitPercent,
        budget.total,
        budget.cost,
        budget.profit
      )
      data = { ...data, ...newValues }
    }

    if (budget.userId !== user.id) {
      return response.unauthorized()
    }
    return await budget.merge(data).save()
  }

  public async destroy({ params, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const { id } = params
    const budget = await Budget.query().where('id', id).andWhere('user_id', user.id).firstOrFail()
    await budget.delete()
    return budget.$isDeleted
  }

  public async ingredientsCount({ params, response }: HttpContextContract) {
    const { id } = params
    const ingredients = await Budget.query()
      .withCount('ingredients', (query) => {
        query.as('countIngredients')
      })
      .where('id', id)

    if (!ingredients.length) {
      return response.notFound()
    }
    return ingredients[0].$extras
  }

  public async search({ request, auth }: HttpContextContract) {
    const query = request.qs()
    const page = query.page ? query.page : 1
    const user = await auth.authenticate()
    const budgets = await Budget.query()
      .where('user_id', user.id)
      .andWhere('name', 'like', `%${query.name}%`)
      .paginate(page, 10)
    return budgets
  }
}
