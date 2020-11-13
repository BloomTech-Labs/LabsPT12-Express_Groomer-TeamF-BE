const faker = require('faker');

const fakeData = [
  {
    id: 1,
    groomerId: '00ultwqjtqt4VCcS24x6',
    businessName: 'Furry Friends Grooming & Care',
    address: faker.address.streetAddress('###'),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    lat: -77.034,
    lng: 38.9096,
  },
  {
    id: 2,
    groomerId: '00ultwz1n9ORpNFc04x6',
    businessName: "Gillian's Fine Pet Grooming",
    address: faker.address.streetAddress('###'),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumberFormat(),
    lat: -77.0497,
    lng: 38.9007,
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
