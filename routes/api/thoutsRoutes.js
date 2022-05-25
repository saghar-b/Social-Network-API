const router = require('express').Router();
const { Thought, User, Reactions } = require('../../models');


// create a new Thought
router.post('/', (req, res) => {
    
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
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

  // update Thoughts
router.put('/:thoughtId', (req, res) => {

  Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});
// add reaction to thought
router.post('/reactions/:thoughtId', (req, res) => {
// req.setEncodingsend("hi")
  Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log("ASDFASDFASDF");
        console.log(err);
        res.status(500).json(err);
      });
});

// delete thoughts
router.delete('/:thoughtId', (req, res) => {

  Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
          if (!thought) {

              res.status(404).json({ message: 'No thought with that ID' })
          } else {

              Reactions.deleteMany({ _id: { $in: thought.reactions } })
          }
      }
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
})

// remove reaction from thought
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
});


module.exports = router;
