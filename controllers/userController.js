// getUsers, getOneUser, createAUser, UpdateAUser, deleteAUser, addAFriend, deleteAFriend

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
}
