
const router = require('express').Router();
const { User, Thought, Reactions } = require('../models');

router.get('/users', (req, res) => {

  User.find({}, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.get('/users/:userId', (req, res) => {

  User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('thoughts')
    .populate('friends')
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
});
router.get('/thoughts', (req, res) => {
  Thought.find()
    
  .populate('reactions')
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error({ message: err });
      return res.status(500).json(err);
    });
  
});

router.get('/reactions', (req, res) => {

  Reactions.find({}, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
module.exports = router;