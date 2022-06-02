import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ingredients extends BaseSchema {
  protected tableName = 'ingredients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('budget_id').references('budgets.id').onDelete('CASCADE').unsigned()
      table.string('name').notNullable()
      table.float('initial_amount')
      table.float('cost')
      table.string('initial_unit')
      table.float('used_amount')
      table.string('used_unit')
      table.float('total')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
