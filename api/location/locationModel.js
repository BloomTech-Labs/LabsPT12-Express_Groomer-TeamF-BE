const db = require('../../data/db-config');

module.exports = { findAll, findBy, findByGroomerId, insert, update, remove };

function findAll() {
  return db('locations');
}

function findBy(field) {
  return db('locations').where(field);
}

function findByGroomerId(id) {
  return db('locations').where({ groomerId: id }).first().select();
}

function insert(location) {
  return db('locations').insert(location).returning('*');
}

function update(id, profile) {
  return db('locations')
    .where({ groomerId: id })
    .first()
    .update(profile)
    .returning('*');
}

function remove(id) {
  return db('locations').where({ groomerId: id }).del();
}
