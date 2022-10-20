const router = require('express').Router();
const { getUsers, 
        getOneUser,
        createAUser,
        UpdateAUser,
        deleteAUser,
        addAFriend,
        deleteAFriend } = require('../../controllers/userController')

// In order the api routes would look like:
// api/users
// api/users/:userId
// api/users/:userId/friends/:friendId
router.route('/').get(getUsers).post(createAUser);
router.route('/:userId').get(getOneUser).put(UpdateAUser).delete(deleteAUser);
router.route('/:userId/friends/:friendId').delete(deleteAFriend).post(addAFriend);

module.exports = router