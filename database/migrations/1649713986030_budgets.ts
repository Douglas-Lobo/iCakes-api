import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Budgets extends BaseSchema {
  protected tableName = 'budgets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description')
      table.float('cost')
      table.float('profit')
      table.float('total')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
