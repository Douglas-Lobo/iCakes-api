import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Ingredient } from 'App/Models'

export default class Budget extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public cost: number

  @column()
  public profit: number

  @column()
  public total: number

  @column()
  public profitPercent: number

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

  @hasMany(() => Ingredient)
  public ingredients: HasMany<typeof Ingredient>
}
