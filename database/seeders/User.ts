import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'virk@adonisjs.com',
        username: 'Douglas',
        password: 'secret',
      },
      {
        email: 'romain@adonisjs.com',
        username: 'Rosa',
        password: 'supersecret',
      },
    ])
  }
}
