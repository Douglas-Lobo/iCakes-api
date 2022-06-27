import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { User } from 'App/Models'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'admin',
      email: 'admin@admin.com',
      username: 'admin',
      password: 'secret',
      role: 'Admin',
    })
  }
}
