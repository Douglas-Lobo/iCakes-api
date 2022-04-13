import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableIngredients extends BaseSchema {
  protected tableName = 'alter_table_ingredients'

  public async up() {
    this.schema.alterTable('ingredients', (table) => {
      table.dropColumn('initial_unit')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
