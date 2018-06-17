exports.up = (knex, Promise) => {
  return knex.schema.createTable('scenes', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.string('text')
    table.integer('next')
    table.string('image')
  })
}
  
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('scenes')
}