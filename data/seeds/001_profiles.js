const faker = require('faker');

exports.seed = function (knex) {
  return knex('profiles')
    .del()
    .then(function () {
      return knex('profiles').insert([
        {
          id: '00ulthapbErVUwVJy4x6',
          email: 'llama001@maildrop.cc"',
          name: 'Test001 User',
          avatarUrl: faker.internet.avatar(),
          type: 1,
          address: '1190 Roberto Ln',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90077',
        },
        {
          id: '00ultwew80Onb2vOT4x6',
          email: 'llama002@maildrop.cc',
          name: 'Test002 User',
          avatarUrl: faker.internet.avatar(),
          type: 1,
          address: '10851 Chalon Rd',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90077',
        },
        {
          id: '00ultx74kMUmEW8054x6',
          email: 'llama003@maildrop.cc',
          name: 'Madame Le Pooche',
          avatarUrl: faker.internet.avatar(),
          type: 2,
          address: '124 S Barrington Pl',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90049',
        },
        {
          id: '00ultwqjtqt4VCcS24x6',
          email: 'llama004@maildrop.cc',
          name: 'Joy Kahn',
          avatarUrl: faker.internet.avatar(),
          type: 2,
          address: '11720 Barrington Ct',
          city: 'Los Angeles',
          state: 'CA',
          zip: ' 90049',
        },
        {
          id: '00ultwz1n9ORpNFc04x6',
          email: 'llama005@maildrop.cc',
          name: 'Mable Ball',
          avatarUrl: faker.internet.avatar(),
          type: 2,
          address: '641 N Sepulveda Blvd',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90049',
        },
      ]);
    });
};
