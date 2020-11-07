exports.up = function (knex) {
  return knex.schema.createTable('locations', function (tbl) {
    tbl.increments();
    tbl
      .string('groomerId')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.string('businessName');
    tbl.string('address');
    tbl.string('city');
    tbl.string('state');
    tbl.string('zip');
    tbl.string('email');
    tbl.string('phoneNumber');
    tbl.float('lat', 10, 6);
    tbl.float('lng', 10, 6);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('locations');
};
