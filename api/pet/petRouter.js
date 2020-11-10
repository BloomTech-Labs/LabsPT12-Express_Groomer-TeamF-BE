const express = require('express');
const router = express.Router({ mergeParams: true });

// Models
const petsDb = require('../pet/petModel');

// Utilities
const { errDetail } = require('../utils/utils');

// Auth middleware
const authRequired = require('../middleware/authRequired');

/**
 * @swagger
 * components:
 *  schemas:
 *    Pets:
 *      type: object
 *      required:
 *        - ownerId
 *        - name
 *      properties:
 *        ownerId:
 *          type: string
 *          description: A foreign key referencing profiles.id
 *        name:
 *          type: string
 *          description: The pet's name
 *        shots:
 *          type: boolean
 *          description: Indicates if the pet's shots are up to date
 *        type:
 *          type: string
 *          description: The type of animal, for example dog, cat, ferret
 *        img:
 *          type: string
 *          description: The url to the pet's profile picture
 *      example:
 *        - ownerId: '00ulthapbErVUwVJy4x6'
 *        - name: 'Bennie'
 *        - shots: true
 *        - type: 'dog'
 *        - img: 'https://images.unsplash.com/photo-1
 *
 * /profiles/:id/pets:
 *  get:
 *    description: Returns an array of pet objects for this user
 *    summary: Get a list of pets owned by a user
 *    security:
 *      - okta: []
 *    tags:
 *      - pets
 *    responses:
 *      200:
 *        description: An array of pets owned by a user
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $refs: #/components/schemas/Pets
 *      400:
 *        $ref: '#/components/responses/BadRequest'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    // Return any pets found, or indicate none were returned
    const oktaId = String(req.params.id);
    const pets = await petsDb.findByOwnerId(oktaId);

    // Authorize the user to only view their pets
    const authId = String(req.profile.id); // Received from the authRequired middleware
    if (authId !== oktaId) {
      return res.status(403).json({
        message: `Access Denied`,
        validation: [
          `Your auth id ${authId} and the route profile id ${oktaId} don't match`,
        ],
        data: {},
      });
    }

    // Return any pets found, or indicate none were found
    if (pets && pets.length) {
      res.status(200).json({
        message: `Successfully fetched the pets for profile ${oktaId}`,
        validation: [],
        data: pets,
      });
    } else {
      res.status(404).json({
        message: `No pets were found for profile ${oktaId}`,
        validation: [],
        data: {},
      });
    }
  } catch (err) {
    // Handle errors with a custom error utility
    errDetail(err);
  }
});

/**
 * @swagger
 * components:
 *  parameters:
 *    petId: petId
 *    in: path
 *    description: The id of the pet to return
 *    required: true
 *    example: 1
 *    schema:
 *      type: integer
 *
 * /profiles/:id/pets/:petId:
 *  get:
 *    description: Get the pet object associated with that id on the pets db
 *    summary: Returns a single pet by id
 *    security:
 *      - okta: []
 *    tags:
 *      - pets
 *    parameters:
 *      - $ref: '#/components/parameters/petId'
 *    responses:
 *      200:
 *        description: Successfully fetched a pet with id X for owner Y
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Pets'
 *      400:
 *        description: 'Bad request'
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        description: 'Unable to find a pet with id X for owner Y'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/:petId', authRequired, async (req, res) => {
  // Ensure the route contains an id
  const oktaId = String(req.params.id); // Cast to int because record ids are integer type
  const petId = Number(req.params.petId);

  // Authorize the user to only view their pets
  const authId = String(req.profile.id); // Received from the authRequired middleware
  if (authId !== oktaId) {
    return res.status(403).json({
      message: `Access Denied`,
      validation: [
        `Your auth id ${authId} and the route profile id ${oktaId} don't match`,
      ],
      data: {},
    });
  }

  // Return any pets found, or indicate none were found
  try {
    const pets = await petsDb.findByOwnerId(oktaId);
    const pet = pets.filter((pet) => pet.id === petId);
    if (pet && pet.length) {
      res.status(200).json({
        message: `Successfully fetched a pet with id ${petId} for owner ${oktaId}`,
        validation: [],
        data: pet,
      });
    } else {
      res.status(404).json({
        message: `Unable to find a pet with id ${petId} for owner ${oktaId}`,
        validation: [],
        data: {},
      });
    }
  } catch (err) {
    // Handle errors with a custom error utility
    errDetail(err);
  }
});

module.exports = router;
