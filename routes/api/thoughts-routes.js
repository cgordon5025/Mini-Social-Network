const router = require('express').Router()
const { Thought } = require('../../models')
const { getAllThoughts,
    getSingleThought,
    newThought,
    updateThought,
    deleteThought,
    reactToThought,
    deleteReaction } = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts).post(newThought)
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/:id/reactions').post(reactToThought).delete(deleteReaction)
module.exports = router