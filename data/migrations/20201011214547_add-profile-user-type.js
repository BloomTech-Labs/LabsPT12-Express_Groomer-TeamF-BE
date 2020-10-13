exports.up = (knex) => {
  return knex.schema.table('profiles', (tbl) => {
    tbl.integer('type').unsigned().notNullable().defaultTo(1);
  });
};

exports.down = (knex) => {
  return knex.schema.table('profiles', (tbl) => {
    tbl.dropColumn('type');
  });
};
