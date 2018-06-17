exports.up = (knex, Promise) => {
  return knex.schema.createTable('choices', (table) => {
    table.integer('scene_id')
    table.increments('choice_id')
    table.string('text')
    table.integer('points')
    table.string('consequences')
  })
}
    
exports.down = (knex, Promise) => {
  return knex.schema.dropTable('choices')
}