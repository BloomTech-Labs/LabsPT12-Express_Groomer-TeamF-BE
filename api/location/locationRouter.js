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

router.delete('/:groomerId', authRequired, async (req, res) => {
  const id = String(req.params.groomerId);
  try {
    db.remove(id).then((location) => {
      res.status(200).json({
        message: `Profile '${id}' was successfully deleted.`,
        data: location,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: 'Unable to delete',
    });
  }
});

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
              message: `Successfully updated profile ${id}`,
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

router.post('/', authRequired, async (req, res) => {
  const location = req.body;
  if (location) {
    const id = String(req.params.groomerId);
    try {
      await db.findByGroomerId(id).then(async (undef) => {
        if (undef == undefined) {
          await db.insert(location).then((location) =>
            res.status(200).json({
              message: 'location created',
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
