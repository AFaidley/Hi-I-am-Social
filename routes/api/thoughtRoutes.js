
const router = require('express').Router();
const { getThought,
        getOneThought,
        createAThought,
        updateAThought,
        deleteAThought,
        addAReaction,
        removeAReaction } = require('../../controllers/thoughtController');

// In order the api routes would look like:
// api/thought
// api/thought/:thoughtId
// api/thought/:thoughtId/reactions
// api/thought/:thoughtId/reactions/:reactionId
router.route('/').get(getThought).post(createAThought);
router.route('/:thoughtId').get(getOneThought).put(updateAThought).delete(deleteAThought);
router.route('/:thoughtId/reactions').post(addAReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeAReaction);

module.exports = router;