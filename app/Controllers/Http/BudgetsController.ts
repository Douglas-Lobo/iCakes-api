import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Budget } from 'App/Models'

export default class BudgetsController {
  public async index({ request }: HttpContextContract) {
    let { page } = request.qs()
    if (!page) {
      page = 1
    }
    return await Budget.query().paginate(page, 2)
  }

  public async store({ request }: HttpContextContract) {
    const data = request.body()
    const budget = await Budget.create(data)
    return budget.$isPersisted
  }

  public async update({ params, request }: HttpContextContract) {
    const { id } = params
    const data = request.all()
    const budget = await Budget.findOrFail(id)
    await budget.merge(data).save()
    return budget.$isPersisted
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params
    const budget = await Budget.findOrFail(id)
    await budget.delete()
    return budget.$isDeleted
  }

  public async ingredients({ params }: HttpContextContract) {
    const { id } = params
    const budget = await Budget.query().preload('ingredient').where('id', id)
    return budget
  }
}
