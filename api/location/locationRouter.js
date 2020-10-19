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
    res.status(200).json(locationData);
  } catch (err) {
    errDetail(res, err);
  }
});

router.get('/:groomerId', authRequired, async (req, res) => {
  try {
    const groomerId = req.params.groomerId;
    const locationData = await findBy({ groomerId });
    res.status(200).json(locationData);
  } catch (err) {
    errDetail(res, err);
  }
});

module.exports = router;
