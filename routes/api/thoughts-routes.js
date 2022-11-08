const router = require('express').Router()
const { Thought } = require('../../models')
const { getAllThoughts,
    getSingleThought,
    newThought,
    updateThought,
    deleteThought } = require('../../controllers/thoughtController')

router.route('/').get(getAllThoughts).post(newThought)
router.route('/:id').get(getSingleThought).post(updateThought).delete(deleteThought)

module.exports = router