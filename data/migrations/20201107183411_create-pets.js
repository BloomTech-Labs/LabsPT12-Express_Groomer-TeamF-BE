exports.up = function (knex) {
  return knex.schema.createTable('pets', function (tbl) {
    tbl.increments();
    tbl
      .string('ownerId')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('name').notNullable();
    tbl.boolean('shots').defaultTo(false);
    tbl.string('type');
    tbl.string('img');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('pets');
};
