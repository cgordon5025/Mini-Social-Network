const router = require('express').Router();
const {
    getAllUser,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser
} = require('../../controllers/userControllers')

router.route('/').get(getAllUser).post(newUser)
router.route('/:id').get(getSingleUser).delete(deleteUser).post(updateUser)


module.exports = router