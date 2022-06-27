import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
  computed,
} from '@ioc:Adonis/Lucid/Orm'
import { Budget, UserKey } from 'App/Models'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public role: 'User' | 'Admin'

  @column()
  public photo: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @computed()
  public get firstName() {
    return this.name ? this.name.charAt(0).toUpperCase() + this.name.split(' ')[0].slice(1) : ''
  }

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy HH:mm:ss')
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy HH:mm:ss')
    },
  })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Budget)
  public budgets: HasMany<typeof Budget>

  @hasOne(() => UserKey)
  public UserKey: HasOne<typeof UserKey>
}
