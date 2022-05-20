
const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
    // Call aggregate() on model
    User.find({}, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
  });

  module.exports = router;