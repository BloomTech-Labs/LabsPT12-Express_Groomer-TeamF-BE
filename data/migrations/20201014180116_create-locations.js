
exports.up = function(knex) {
  return knex.schema.createTable("locations", function(table) {
      table.string('id').notNullable().unique().primary();
      table.string('groomerId').notNullable()
      table.string('businessName')
      table.string('address')
      table.string('email')
      table.string('phoneNumber')
      table.float('lat', 10, 6)
      table.float('lng', 10, 6)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('locations')
};
