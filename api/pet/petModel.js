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

function insert(pet) {
  // Remove the id if it's sent with the object
  if (Object.keys(pet).includes('id')) {
    delete pet.id;
  }
  return db('pets').insert(pet).returning('*');
}

function update(id, pet) {
  // Remove the id if it's sent with the object
  if (Object.keys(pet).includes('id')) {
    delete pet.id;
  }
  return db('pets').where({ id }).update(pet).returning('*');
}

function remove(petId, ownerId) {
  return db('pets')
    .where({
      id: petId,
      ownerId,
    })
    .del();
}
