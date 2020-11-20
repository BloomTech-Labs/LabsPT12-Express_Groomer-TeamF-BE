const express = require('express');
const router = express.Router();
const db = require('./locationModel');

// Db models
const { findAll, findBy } = require('./locationModel');

// Utilities
const { errDetail } = require('../utils/utils');

// Auth middleware
const authRequired = require('../middleware/authRequired');

// Routes

/**
 * @swagger
 *  components:
 *   schemas:
 *    Locations:
 *      type: object
 *      required:
 *        - groomerId
 *      properties:
 *        id:
 *          type: string
 *          description: The record id
 *        groomerId:
 *          type: string
 *          description: A foreign key referencing profiles.id
 *        name:
 *          type: string
 *          description: The location's name
 *        businessName:
 *          type: string
 *          description: The name of the groomer's business
 *        address:
 *          type: string
 *          description: The location's address
 *        city:
 *          type: string
 *          description: The location's city
 *        state:
 *          type: string
 *          description: The location's state
 *        zip:
 *          type: string
 *          description: The location's zip code
 *        email:
 *          type: string
 *          description: The business's email address
 *        phoneNumber:
 *          type: string
 *          description: The business's phone number
 *        lat:
 *          type: float
 *          description: The latitude coordinate for the business address
 *        lon:
 *          type: float
 *          description: The longitude coordinate for the business address
 * /locations:
 *  get:
 *    description: Returns an array of location objects for this user
 *    summary: Get a list of locations owned by a user
 *    security:
 *      - okta: []
 *    tags:
 *      - locations
 *    responses:
 *      200:
 *        description: The success message after fetching all pets
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Pets'
 *              properties:
 *                message:
 *                  type: string
 *                  description: A status message
 *                  example: Success
 *                validation:
 *                  type: array
 *                  description: An array of validation errors
 *                  example: []
 *                data:
 *                  type: array
 *                  description: The data returned from the endpoint
 *                  example:
 *                    - id: 1
 *                      groomerId: 00wi8Swz1n9ORpNFc04x6
 *                      businessName: Madame's Pet Styles
 *                      address: 25 Winding Lane
 *                      city: Los Angeles
 *                      state: CA
 *                      zip: 90210
 *                      email: madame@petstyles.io
 *                      phoneNumber: 903-101-2203
 *                      lat: -77.012
 *                      lng: 38.897
 *                    - id: 2
 *                      groomerId: 00ultwz1n9ORpNFc04x6
 *                      businessName: Gillians Fine Pet Grooming
 *                      address: 100 Main Street
 *                      city: Los Angeles
 *                      state: CA
 *                      zip: 90210
 *                      email: gillian@finepetgrooming.com
 *                      phoneNumber: 902-111-2222
 *                      lat: -77.0497
 *                      lng: 38.9007
 *      404:
 *        $ref: '#/components/responses/LocationNotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/', authRequired, async (req, res) => {
  try {
    const locationData = await findAll();
    res.status(200).json({
      message: 'Success',
      validation: [],
      data: locationData,
    });
  } catch (err) {
    errDetail(res, err);
  }
});

/**
 * @swagger
 *  components:
 *   parameters:
 *     groomerId:
 *      in: path
 *      description: The groomerId, which is the sub from the okta auth claims
 *      required: true
 *      example: 00ultwz1n9ORpNFc04x6
 *      schema:
 *        type: string
 * /locations/:groomerId:
 *  get:
 *    description: Returns an array of location objects for this user
 *    summary: Get a location owned by a user
 *    security:
 *      - okta: []
 *    tags:
 *      - locations
 *    responses:
 *      200:
 *        description: The success message after fetching a pet
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Pets'
 *              properties:
 *                message:
 *                  type: string
 *                  description: A status message
 *                  example: Success
 *                validation:
 *                  type: array
 *                  description: An array of validation errors
 *                  example: []
 *                data:
 *                  type: array
 *                  description: The data returned from the endpoint
 *                  example:
 *                    - id: 1
 *                      groomerId: 00wi8Swz1n9ORpNFc04x6
 *                      businessName: Madame's Pet Styles
 *                      address: 25 Winding Lane
 *                      city: Los Angeles
 *                      state: CA
 *                      zip: 90210
 *                      email: madame@petstyles.io
 *                      phoneNumber: 903-101-2203
 *                      lat: -77.012
 *                      lng: 38.897
 *      404:
 *        $ref: '#/components/responses/LocationNotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.get('/:groomerId', authRequired, async (req, res) => {
  try {
    const groomerId = String(req.params.groomerId);
    const location = await findBy({ groomerId });

    if (location && location.length) {
      const locationRes = {
        message: 'Success',
        validation: [],
        data: location,
      };
      res.status(200).json(locationRes);
    } else {
      res.status(404).json({
        message: 'Location Not Found',
        validation: [],
        data: [],
      });
    }
  } catch (err) {
    errDetail(res, err);
  }
});

/**
 * @swagger
 *  components:
 *   parameters:
 *     groomerId:
 *      in: path
 *      description: The groomerId, which is the sub from the okta auth claims
 *      required: true
 *      example: 00ultwz1n9ORpNFc04x6
 *      schema:
 *        type: string
 *   schemas:
 *    Locations:
 *      type: object
 *      required:
 *        - groomerId
 *      properties:
 *        id:
 *          type: integer
 *          description: The record id
 *        groomerId:
 *          type: string
 *          description: A foreign key referencing profiles.id
 *        name:
 *          type: string
 *          description: The location's name
 *        businessName:
 *          type: string
 *          description: The name of the groomer's business
 *        address:
 *          type: string
 *          description: The location's address
 *        email:
 *          type: string
 *          description: The business's email address
 *        phoneNumber:
 *          type: string
 *          description: The business's phone number
 *        lat:
 *          type: float
 *          description: The latitude coordinate for the business address
 *        lon:
 *          type: float
 *          description: The longitude coordinate for the business address
 * /locations/:groomerId:
 *  delete:
 *    description: Returns an object indicating success or failure of deletion
 *    summary: Get a list of locations owned by a user
 *    security:
 *      - okta: []
 *    tags:
 *      - locations
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Locations'
 *              properties:
 *                message:
 *                  type: string
 *                  description: A status message
 *                  example: The location for groomer 00ultwz1n9ORpNFc04x6 was successfully deleted.
 *                validation:
 *                  type: array
 *                  description: An array of validation errors
 *                  example: []
 *                data:
 *                  type: integer
 *                  description: The data returned from the endpoint
 *                example: 1
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.delete('/:groomerId', authRequired, async (req, res) => {
  const id = String(req.params.groomerId);
  try {
    db.remove(id).then((location) => {
      res.status(200).json({
        message: `The location for groomer '${id}' was successfully deleted.`,
        validation: [],
        data: location,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: 'Unable to delete',
      validation: [],
      data: {},
    });
  }
});

/**
 * @swagger
 *  components:
 *   parameters:
 *     groomerId:
 *      in: path
 *      description: The groomerId, which is the sub from the okta auth claims
 *      required: true
 *      example: 00ultwz1n9ORpNFc04x6
 *      schema:
 *        type: string
 * /locations/:groomerId:
 *  put:
 *    description: Returns an array of location objects for this user
 *    summary: Get a location owned by a user
 *    security:
 *      - okta: []
 *    tags:
 *      - locations
 *    responses:
 *      200:
 *        description: The success message after updating a pet
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Pets'
 *              properties:
 *                message:
 *                  type: string
 *                  description: A status message
 *                  example: Successfully updated location 00ultwqjtqt4VCcS24x6
 *                validation:
 *                  type: array
 *                  description: An array of validation errors
 *                  example: []
 *                data:
 *                  type: array
 *                  description: The data returned from the endpoint
 *                  example:
 *                    - id: 1
 *                      groomerId: 00wi8Swz1n9ORpNFc04x6
 *                      businessName: Madame's Pet Styles
 *                      address: 25 Winding Lane
 *                      city: Los Angeles
 *                      state: CA
 *                      zip: 90210
 *                      email: madame@petstyles.io
 *                      phoneNumber: 903-101-2203
 *                      lat: -77.012
 *                      lng: 38.897
 *      404:
 *        $ref: '#/components/responses/LocationNotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.put('/:groomerId', authRequired, function (req, res) {
  const location = req.body;
  if (location) {
    const id = String(req.params.groomerId);
    db.findByGroomerId(id)
      .then(
        db
          .update(id, location)
          .then((updated) => {
            res.status(200).json({
              message: `Successfully updated location ${id}`,
              data: updated,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update location '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find location '${id}'`,
          error: err.message,
        });
      });
  }
});

/**
 * @swagger
 *  components:
 *   parameters:
 *     groomerId:
 *      in: path
 *      description: The groomerId, which is the sub from the okta auth claims
 *      required: true
 *      example: 00ultwz1n9ORpNFc04x6
 *      schema:
 *        type: string
 * /locations/:groomerId:
 *  post:
 *    description: Returns an array of location objects for this user
 *    summary: Get a location owned by a user
 *    security:
 *      - okta: []
 *    tags:
 *      - locations
 *    responses:
 *      200:
 *        description: The success message after adding a pet
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Pets'
 *              properties:
 *                message:
 *                  type: string
 *                  description: A status message
 *                  example: Location created
 *                validation:
 *                  type: array
 *                  description: An array of validation errors
 *                  example: []
 *                data:
 *                  type: array
 *                  description: The data returned from the endpoint
 *                  example:
 *                    - id: 1
 *                      groomerId: 00wi8Swz1n9ORpNFc04x6
 *                      businessName: Madame's Pet Styles
 *                      address: 25 Winding Lane
 *                      city: Los Angeles
 *                      state: CA
 *                      zip: 90210
 *                      email: madame@petstyles.io
 *                      phoneNumber: 903-101-2203
 *                      lat: -77.012
 *                      lng: 38.897
 *      404:
 *        $ref: '#/components/responses/LocationNotFound'
 *      500:
 *        $ref: '#/components/responses/ServerError'
 */
router.post('/', authRequired, async (req, res) => {
  let location = req.body;
  const id = location.groomerId;
  if (location) {
    try {
      await db.findByGroomerId(id).then(async (undef) => {
        if (undef == undefined) {
          await db.insert(location).then((location) =>
            res.status(200).json({
              message: 'Location created',
              data: location,
            })
          );
        } else {
          res.status(400).json({
            message: 'location already exists',
          });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({
        message: `A user is already using that id`,
      });
    }
  } else {
    res.status(404).json({
      message: 'location missing',
    });
  }
});

module.exports = router;
