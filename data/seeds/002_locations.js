const faker = require('faker');

const fakeData = [
  {
    id: 1,
    groomerId: 'ce68mjqz2by3t2peo6i4',
    businessName: 'Furry Friends Grooming & Care',
    address: faker.address.streetAddress('###'),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
  },
  {
    id: 2,
    groomerId: 'bftqzfqkq3xzj953q64r',
    businessName: "Gillian's Fine Pet Grooming",
    address: faker.address.streetAddress('###'),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('locations')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert(fakeData);
    });
};
