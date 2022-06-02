import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableBudgets extends BaseSchema {
  protected tableName = 'alter_table_budgets'

  public async up() {
    this.schema.alterTable('budgets', (table) => {
      table.float('profit_percent').defaultTo(0).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
