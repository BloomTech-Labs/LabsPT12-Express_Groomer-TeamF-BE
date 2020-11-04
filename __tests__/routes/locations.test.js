const request = require('supertest');
const express = require('express');
const Locations = require('../../api/location/locationModel');
const locationRouter = require('../../api/location/locationRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/location/locationModel');
// mock the auth middleware completely
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('locations router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/locations'], locationRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test the GET endpoints
  describe('the GET locations/ route', () => {
    it('should return all locations', async () => {
      Locations.findAll.mockResolvedValue([]);
      const res = await request(server).get('/locations');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(0);

      // Verify that the mock was called
      expect(Locations.findAll.mock.calls.length).toBe(1);
    });
  });

  describe('the GET locations/:groomerId route', () => {
    it('should return a 200 code when it finds the id', async () => {
      Locations.findBy.mockResolvedValue([
        {
          id: '1',
          groomerId: 'bftqzfqkq3xzj953q64r',
          businessName: "Gillian's Fine Pet Grooming",
          address: '032 Gordon Creek Apt. 557',
          email: 'Carolanne.Ullrich14@gmail.com',
          phoneNumber: '414-962-7162',
          lat: -53.91525,
          lng: -96.60353,
        },
      ]);
      const res = await request(server).get('/locations/bftqzfqkq3xzj953q64r');
      const first = res.body.data[0];

      expect(res.status).toBe(200);
      expect(first.groomerId).toBe('bftqzfqkq3xzj953q64r');
      expect(first.businessName).toBe("Gillian's Fine Pet Grooming");
      expect(first.address).toBe('032 Gordon Creek Apt. 557');
      expect(first.email).toBe('Carolanne.Ullrich14@gmail.com');
      expect(first.phoneNumber).toBe('414-962-7162');
      expect(first.lat).toBe(-53.91525);
      expect(first.lng).toBe(-96.60353);

      // Verify that the mock was called
      expect(Locations.findBy.mock.calls.length).toBe(1);
    });

    it("should return a 404 code when it can't find the id", async () => {
      Locations.findBy.mockResolvedValue([]);
      const res = await request(server).get('/locations/bftqzfqkq3xzj953q64r');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Location Not Found');

      // Verify that the mock was called
      expect(Locations.findBy.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /locations', () => {
    it('should return 200 when profile is created', async () => {
      const location = {
        id: '3',
        groomerId: 'hgf5rfgh54',
        businessName: 'Groomers R Us',
        address: '123 Ruff Rd',
        email: 'Roger@gmail.com',
        phoneNumber: '818-222-8983',
        lat: -153.91525,
        lng: 6.60353,
      };
      Locations.findByGroomerId.mockResolvedValue(location);
      Locations.update.mockResolvedValue([
        {
          id: '3',
          groomerId: '245feafeffehes',
          businessName: 'Groomers R Us',
          address: '123 Ruff Rd',
          email: 'Roger@gmail.com',
          phoneNumber: '818-222-8983',
          lat: -153.91525,
          lng: 6.60353,
        },
      ]);
      const res = await request(server)
        .put(`/locations/hgf5rfgh54`)
        .send(location);
      const first = res.body.data[0];

      expect(res.status).toBe(200);
      expect(first.groomerId).not.toBe(`hgf5rfgh54`);
      expect(first.groomerId).toBe(`245feafeffehes`);

      // Verify that the mocks were called
      expect(Locations.findByGroomerId.mock.calls.length).toBe(1);
      expect(Locations.update.mock.calls.length).toBe(1);
    });
  });
});
