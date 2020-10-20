const express = require('express');
const router = express.Router();

// Db models
const { findAll, findBy } = require('./locationModel');

// Utilities
const { errDetail } = require('../utils/utils');

// Auth middleware
const authRequired = require('../middleware/authRequired');

// Routes
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

module.exports = router;
