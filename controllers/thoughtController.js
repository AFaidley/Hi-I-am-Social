// getThought, getOneThought, createAThought, updateAThought, deleteAThought, addAReaction, deleteAReaction 

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
            // .then(user) => !user
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    updateAThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Unable to find a thought with a matching Id' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteAThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Unable to find a thought with a matching Id' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res
                        .json({ message: 'Thought deleted successfully' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


    addAReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Unable to find a thought with a matching Id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteAReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'Unable to find a thought with a matching Id' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
}