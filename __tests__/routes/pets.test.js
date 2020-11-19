//const request = require('supertest');
const request = require('supertest');
const express = require('express');
const Pets = require('../../api/pet/petModel');
const profileRouter = require('../../api/profile/profileRouter');
const server = express();
server.use(express.json());

// Test object factory functions
const generate = require('../../test/utils/generate');
const profileId = '00ulthapbErVUwVJy4x6';
const petsUrl = `/profiles/${profileId}/pets`;

// Custom middleware
const { authId } = require('../../api/middleware/petMiddleware');

// Mocks
// The model functions for the pet router
jest.mock('../../api/pet/petModel.js');

// The pet middleware
jest.mock('../../api/middleware/petMiddleware');

// Mock the authId middleware since req.profile isn't available to supertest
authId.mockImplementation(function (req, res, next) {
  next();
});

// Auth middleware
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

// Testing
describe('pets router endpoints', () => {
  beforeAll(() => {
    // This is the module/route being tested
    server.use(['/profiles'], profileRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test the GET endpoints
  describe('the GET pets/ route', () => {
    it('should return all pets', async () => {
      // Configure mock resolve values
      Pets.findByOwnerId.mockResolvedValue([]);

      // Send the request
      let res = await request(server).get(petsUrl);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({
        message: 'No pets were found for profile 00ulthapbErVUwVJy4x6',
        validation: [],
        data: {},
      });

      // Verify that the mock was called
      expect(Pets.findByOwnerId).toHaveBeenCalledWith(profileId);
      expect(Pets.findByOwnerId).toHaveBeenCalledTimes(1);
    });
  });

  describe('the GET pets/:petId route', () => {
    it('should return a 200 code when it finds the id', async () => {
      const pet = generate.buildPet({ ownerId: profileId });
      Pets.findByOwnerId.mockResolvedValue([pet]);
      const res = await request(server).get(petsUrl + `/${pet.id}`);
      const first = res.body.data[0];

      expect(res.status).toBe(200);
      expect(first).toEqual(pet);

      // Verify that the mock was called
      expect(Pets.findByOwnerId).toHaveBeenCalledWith(pet.ownerId);
      expect(Pets.findByOwnerId.mock.calls.length).toBe(1);
    });

    it("should return a 404 code when it can't find the id", async () => {
      const pet = generate.buildPet({ ownerId: profileId });
      Pets.findByOwnerId.mockResolvedValue([]);
      const res = await request(server).get(petsUrl + `/${pet.id}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe(
        `Unable to find a pet with id ${pet.id} for owner 00ulthapbErVUwVJy4x6`
      );

      // Verify that the mock was called appropriately
      expect(Pets.findByOwnerId).toHaveBeenCalledWith(pet.ownerId);
      expect(Pets.findByOwnerId.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /profiles/:/pets', () => {
    it('should return 200 when profile is created', async () => {
      // Mock model functions
      const newOwnerId = generate.getOktaId();
      const pet = generate.buildPet({ ownerId: profileId });
      const updatedPet = {
        ...pet,
        ownerId: newOwnerId,
      };
      Pets.findByOwnerId.mockResolvedValue([pet]);
      Pets.update.mockResolvedValue([updatedPet]);

      // Send the req
      const res = await request(server)
        .put(petsUrl + `/${pet.id}`)
        .send({ ownerId: profileId });
      const first = res.body.data[0];

      expect(res.status).toBe(200);
      expect(first.ownerId).not.toBe(pet.ownerId);
      expect(first.ownerId).toBe(newOwnerId);

      // Verify that the mocks were called
      expect(Pets.findByOwnerId.mock.calls.length).toBe(1);
      expect(Pets.findByOwnerId).toHaveBeenCalledWith(pet.ownerId);
      expect(Pets.update.mock.calls.length).toBe(1);
      expect(Pets.update).toHaveBeenCalledWith(pet.id, {
        ownerId: pet.ownerId,
      });
    });
  });

  describe('POST /profiles/:/pets', () => {
    test('the post controller for pets inserts a pet', async () => {
      const pet = generate.buildPet({ ownerId: profileId });
      Pets.insert.mockResolvedValue([pet]);
      Pets.findByOwnerId.mockResolvedValue(undefined);

      // Send the request
      const res = await request(server).post(petsUrl).send(pet);
      // The response is the first array element
      const first = res.body.data[0];

      // The response
      expect(res.status).toBe(200);
      expect(first).toEqual(pet);

      // There is one and only one pet returned
      expect(res.body.data).toHaveLength(1);

      // The pet object was sent to the endpoint
      expect(Pets.insert.mock.calls.length).toBe(1);
      expect(Pets.insert).toHaveBeenCalledWith(pet);
    });
  });

  describe('DELETE /profiles/:/pets', () => {
    test('the delete controller for pets deletes a pet', async () => {
      const pet = generate.buildPet({ ownerId: profileId });
      Pets.findByOwnerId.mockResolvedValue([pet]);
      Pets.remove.mockResolvedValue(1);

      // Send the request
      const res = await request(server)
        .delete(petsUrl + `/${pet.id}`)
        .send();
      // Grab the first element in the response
      const first = res.body.data[0];
      expect(first).toBeUndefined();

      // Test that there is nothing returned
      expect(res.body).toEqual({
        message: `Successfully deleted the pet with id ${pet.id} for owner ${pet.ownerId}`,
        validation: [],
        data: {},
      });

      // The owner id was sent to the end point, and the mocck was called
      expect(Pets.remove.mock.calls.length).toBe(1);
      expect(Pets.remove).toHaveBeenCalledWith(pet.id, pet.ownerId);
    });
  });
});
