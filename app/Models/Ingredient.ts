import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Budget } from 'App/Models'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public initial_amount: number

  @column()
  public cost: number

  @column()
  public used_amount: number

  @column()
  public used_unit: string

  @column()
  public total: number

  @column()
  public budgetId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Budget)
  public budget: BelongsTo<typeof Budget>
}
