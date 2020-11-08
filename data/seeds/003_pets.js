const faker = require('faker');

exports.seed = function (knex) {
  return knex('pets')
    .del()
    .then(function () {
      return knex('pets').insert([
        {
          owner_id: '00ulthapbErVUwVJy4x6',
          name: faker.name.firstName(),
          shots: true,
          type: 'dog',
          img:
            'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=100&q=80',
        },
        {
          owner_id: '00ulthapbErVUwVJy4x6',
          name: faker.name.firstName(),
          shots: true,
          type: 'cat',
          img:
            'https://images.unsplash.com/photo-1543852786-1cf6624b9987?iauto=format&fit=crop&w=200&q=80',
        },
        {
          owner_id: '00ultwew80Onb2vOT4x6',
          name: faker.name.firstName(),
          shots: true,
          type: 'dog',
          img:
            'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=200&q=80',
        },
      ]);
    });
};
