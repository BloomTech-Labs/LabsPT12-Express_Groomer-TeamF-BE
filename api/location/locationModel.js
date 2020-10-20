const db = require('../../data/db-config');

module.exports = { findAll, findBy, findByGroomerId, insert, remove };

function findAll() {
  return db('locations');
}

function findBy(field) {
  return db('locations').where(field);
}

function findByGroomerId(id) {
  return db('locations').where('groomer_id', id);
}

function insert(location) {
  return db('locations').insert(location).returning('*');
}

function remove(id) {
  return db('locations').where({ id }).del();
}
