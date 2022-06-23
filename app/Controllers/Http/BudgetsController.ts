import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Budget } from 'App/Models'
import { updateBudgetValues } from 'App/Utils/Calculations'
import { StoreValidator, UpdateValidator } from 'App/Validators/Budget'

export default class BudgetsController {
  public async index({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate()
    let { page, perPage, sort } = request.qs()
    page = page ? page : 1
    perPage = perPage ? perPage : 11
    sort = sort ? sort : 'desc'
    const budgets = await user
      .related('budgets')
      .query()
      .orderBy('created_at', sort)
      .paginate(page, perPage)
    return budgets
  }

  public async store({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = await request.validate(StoreValidator)
    return await user.related('budgets').create(data)
  }

  public async show({ params, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const budgetId = params.id
    return await user.related('budgets').query().where('id', budgetId).firstOrFail()
  }

  public async update({ params, request, auth }: HttpContextContract) {
    const { id } = params
    let data = await request.validate(UpdateValidator)
    const user = await auth.authenticate()
    const budget = await user.related('budgets').query().where('id', id).firstOrFail()

    if (budget.profitPercent !== data.profitPercent) {
      const newValues = updateBudgetValues(
        data.profitPercent,
        budget.total,
        budget.cost,
        budget.profit
      )
      data = { ...data, ...newValues }
    }

    return await budget.merge(data).save()
  }

  public async destroy({ params, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const { id } = params
    const budget = await user.related('budgets').query().where('id', id).firstOrFail()
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
