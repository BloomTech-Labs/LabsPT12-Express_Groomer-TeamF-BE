const db = require('../../data/db-config');

module.exports = { findAll, findBy, findByOwnerId, insert, update, remove };

function findAll() {
  return db('pets');
}

function findBy(field) {
  return db('pets').where(field);
}

function findByOwnerId(id) {
  return db('pets').where({ ownerId: id });
}

function insert(location) {
  return db('pets').insert(location).returning('*');
}

function update(id, pet) {
  return db('pets').where({ id }).update(pet).returning('*');
}

function remove(id) {
  return db('pets').where({ ownerId: id }).del();
}
