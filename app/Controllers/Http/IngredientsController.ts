import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Ingredient, Budget } from 'App/Models'
import { calcIngredientTotal, calcBudgetValues, budgetDelIngredient } from 'App/Utils/Calculations'

export default class IngredientController {
  public async index({ params, auth }: HttpContextContract) {
    const { budgetId } = params
    const user = await auth.authenticate()
    await Budget.query().where('id', budgetId).andWhere('user_id', user.id).firstOrFail()

    return Ingredient.query().where('budget_id', budgetId).paginate(1, 10)
  }

  public async store({ request, params, auth }: HttpContextContract) {
    const data = {
      ...request.only(['name', 'initialAmount', 'cost', 'usedAmount', 'usedUnit']),
      ...params,
    }
    const { budgetId } = params
    const user = await auth.authenticate()
    const budget = await Budget.query()
      .where('id', budgetId)
      .andWhere('user_id', user.id)
      .firstOrFail()
    const ingredientTotal = calcIngredientTotal(data.cost, data.usedAmount, data.initialAmount)
    const newData = { ...data, ...ingredientTotal }
    const ingredient = await Ingredient.create(newData)
    const budgetUpdate = calcBudgetValues(budget.cost, ingredientTotal.total, budget.profitPercent)
    await budget.merge(budgetUpdate).save()
    return ingredient
  }

  public async update({ request, params, auth }: HttpContextContract) {
    const data = request.all()
    const { budgetId, id } = params
    const user = await auth.authenticate()
    const budget = await Budget.query()
      .where('id', budgetId)
      .andWhere('user_id', user.id)
      .firstOrFail()

    const ingredient = await Ingredient.query()
      .where('budget_id', budgetId)
      .andWhere('id', id)
      .firstOrFail()
    if (
      ingredient.initialAmount !== data.initialAmount ||
      ingredient.cost !== data.cost ||
      ingredient.usedAmount !== data.usedAmount
    ) {
      const budgetCost = budget.cost - ingredient.total
      const ingredientTotal = calcIngredientTotal(data.cost, data.usedAmount, data.initialAmount)
      const newData = { ...data, ...ingredientTotal }
      await ingredient.merge(newData).save()
      const budgetUpdate = calcBudgetValues(budgetCost, ingredientTotal.total, budget.profitPercent)
      await budget.merge(budgetUpdate).save()
      return ingredient
    }
    await ingredient.merge(data).save()
    return ingredient
  }

  public async destroy({ params, auth }: HttpContextContract) {
    const { budgetId, id } = params
    const user = await auth.authenticate()
    const budget = await Budget.query()
      .where('id', budgetId)
      .andWhere('user_id', user.id)
      .firstOrFail()

    const ingredient = await Ingredient.query()
      .where('budget_id', params.budgetId)
      .andWhere('id', id)
      .firstOrFail()
    const newCost = budget.cost - ingredient.cost
    const newBudgetValues = budgetDelIngredient(newCost, budget.profitPercent)
    await budget.merge(newBudgetValues).save()
    await ingredient.delete()
    return ingredient.$isDeleted
  }
}
