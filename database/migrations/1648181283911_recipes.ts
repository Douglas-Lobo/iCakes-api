import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Recipes extends BaseSchema {
  protected tableName = 'recipes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.text('description')
      table.text('ingredients').notNullable()
      table.text('prep_mode').notNullable()
      table.string('prep_time').notNullable()
      table.string('yields')
      table.integer('user_id').references('users.id').onDelete('CASCADE').unsigned()
      table.integer('category_id').references('categories.id').onDelete('CASCADE').unsigned()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
