exports.up = (knex) => {
  return knex.schema.table('profiles', (tbl) => {
    tbl.string('address');
    tbl.string('city');
    tbl.string('state');
    tbl.string('zip');
  });
};

exports.down = (knex) => {
  return knex.schema.table('profiles', (tbl) => {
    tbl.dropColumn('address');
    tbl.dropColumn('city');
    tbl.dropColumn('state');
    tbl.dropColumn('zip');
  });
};
