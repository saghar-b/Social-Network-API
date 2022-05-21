const router = require('express').Router();
const { Thought, User, Reactions } = require('../../models');
const Thoughts = require('../../models/Thought');


// create a new reactions
router.post('/', (req, res) => {
    
    Reactions.create(req.body)
      .then((reactions) => {
        return Thoughts.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $addToSet: { reactions: reactions._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the Thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
