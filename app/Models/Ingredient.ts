import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { Budget } from 'App/Models'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public initialAmount: number

  @column()
  public cost: number

  @column()
  public usedAmount: number

  @column()
  public usedUnit: string

  @column()
  public total: number

  @column()
  public budgetId: number

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yy')
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yy')
    },
  })
  public updatedAt: DateTime

  @belongsTo(() => Budget)
  public budget: BelongsTo<typeof Budget>
}
