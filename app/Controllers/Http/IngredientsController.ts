import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Ingredient, Budget } from 'App/Models'
import { calcIngredientTotal, calcBudgetValues, budgetDelIngredient } from 'App/Utils/Calculations'
import { StoreValidator, UpdateValidator } from 'App/Validators/Ingredient'
export default class IngredientController {
  public async index({ params, auth }: HttpContextContract) {
    const { budgetId } = params
    const user = await auth.authenticate()
    await Budget.query().where('id', budgetId).andWhere('user_id', user.id).firstOrFail()

    return Ingredient.query().where('budget_id', budgetId).paginate(1, 10)
  }

  public async store({ request, params, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await auth.authenticate()
    const { budgetId } = params
    const budget = await user.related('budgets').query().where('id', budgetId).firstOrFail()
    const ingredientTotal = calcIngredientTotal(data.cost, data.usedAmount, data.initialAmount)
    const newIngredientData = { ...data, ...ingredientTotal }
    const budgetUpdate = calcBudgetValues(budget.cost, ingredientTotal.total, budget.profitPercent)
    await budget.merge(budgetUpdate).save()
    const ingredient = await budget.related('ingredients').create(newIngredientData)
    return ingredient
  }

  public async update({ request, params, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const { budgetId, id } = params
    const user = await auth.authenticate()
    const budget = await user.related('budgets').query().where('id', budgetId).firstOrFail()
    const ingredient = await budget.related('ingredients').query().where('id', id).firstOrFail()

    if (
      ingredient.initialAmount !== data.initialAmount ||
      ingredient.cost !== data.cost ||
      ingredient.usedAmount !== data.usedAmount
    ) {
      const budgetCost = budget.cost - ingredient.total
      const ingredientTotal = calcIngredientTotal(data.cost, data.usedAmount, data.initialAmount)
      const budgetUpdate = calcBudgetValues(budgetCost, ingredientTotal.total, budget.profitPercent)
      const newIngredientData = { ...data, ...ingredientTotal }

      await ingredient.merge(newIngredientData).save()
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
