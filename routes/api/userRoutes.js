const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    UpdateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController')

// In order the api route would look like:
// api/users
// api/users/:userId
// api/users/:userId/friends/:friendId
router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(UpdateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').delete(deleteFriend).post(addFriend);

module.exports = router