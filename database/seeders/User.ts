import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Douglas Lobo',
        email: 'virk@adonisjs.com',
        username: 'Douglas',
        password: 'secret',
        role: 'Admin',
      },
      {
        name: 'Rosa Bento',
        email: 'r@r.com',
        username: 'Rosa',
        password: 'supersecret',
      },
    ])
  }
}
