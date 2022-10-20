// getUsers, getOneUser, createAUser, UpdateAUser, deleteAUser, addAFriend, deleteAFriend + delete thought associated with user when deleted

//Ask tutor about deconstructing--
const { User, Thought } = require('../models')

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                return res.json(users)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Unable to find a user with a matching Id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    createAUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    UpdateAUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Unable to find a user with a matching Id' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteAUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Unable to find a user with a matching Id' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and their associated thoughts deleted' }))
            .catch((err) => res.status(500).json(err));
    },

    addAFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Unable to find a user with a matching Id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },

    deleteAFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Unable to find a user with a matching Id' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    }
};
