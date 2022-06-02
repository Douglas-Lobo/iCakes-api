import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Budgets extends BaseSchema {
  protected tableName = 'budgets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('users.id').onDelete('CASCADE').unsigned()
      table.string('name').notNullable()
      table.string('description')
      table.float('cost').defaultTo(0)
      table.float('profit').defaultTo(0)
      table.float('total').defaultTo(0)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
