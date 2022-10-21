// getThought, getOneThought, createAThought, updateAThought, deleteAThought, addAReaction, removeAReaction 

const { User, Thought, Reaction } = require('../models')

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Unable to find a thought with a matching Id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createAThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { runValidators: true, new: true }
                );
            })
            // Need to ask TA or tutor about the arg
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Unable to find a user with a matching Id',
                    })
                    : res.json('New thought added successfully')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}