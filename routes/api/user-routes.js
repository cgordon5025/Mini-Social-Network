const router = require('express').Router();
const {
    getAllUser,
    getSingleUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userControllers')

router.route('/').get(getAllUser).post(newUser)
router.route('/:id').get(getSingleUser).delete(deleteUser).post(updateUser)
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router