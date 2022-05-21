const router = require('express').Router();
const { User } = require('../../models');
const Thoughts = require('../../models/Thought');


// create a user
router.post('/', (req, res) => {

    User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
});

// update user
router.put('/:userId', (req, res) => {

    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
});



// add a friend
router.post('/:userId/friend/:friendID', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { "friends": req.params.friendID } },
        { new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'Video created, but found no user with that ID',
                })
                : res.json('added friend🎉')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a friend
router.delete('/:userId/friend/:friendID', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { "friends": req.params.friendID } },
        { new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'Video created, but found no user with that ID',
                })
                : res.json('delete the friend :(')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.delete('/:userId', (req, res) => {

    User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => {
            if (!user) {

                res.status(404).json({ message: 'No user with that ID' })
            } else {

                Thoughts.deleteMany({ _id: { $in: user.thoughts } })
                User.deleteMany({ _id: { $in: user.friends } })
            }
        }
        )
        .then(() => res.json({ message: 'User and associated apps deleted!' }))
        .catch((err) => res.status(500).json(err));
})
module.exports = router;