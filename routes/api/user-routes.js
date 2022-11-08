const router = require('express').Router();
const { User } = require('../../models')
//Find all users
router.get('/', async (req, res) => {
    User.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            console.log("encountered an error")
            res.status(500).json(err)
        }
    })
})

//Find a single user by their _id
router.get('/:id', async (req, res) => {
    User.findOne({
        _id: `${req.params.id}`
    }, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            console.log("encountered an error")
            res.status(500).json(err)
        }
    })
})
//Post a new User
router.post('/', async (req, res) => {
    const newUser = new User({
        "username": req.body.username,
        "email": req.body.email
    })
    newUser.save()
    if (newUser) {
        res.status(200).json(newUser)
    } else {
        console.log("error creating a new User")
        res.status(500).json(err)
    }
})
//Update a user by _id
router.put('/:id', (req, res) => {
    User.findOneAndUpdate({
        _id: `${req.params.id}`
    }, {
        $set: {
            "username": req.body.username,
            "email": req.body.email
        }
    }, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            console.log("oops an error")
            res.status(500).json(err)
        }
    })
})
//Delete user by _id
router.delete('/:id', (req, res) => {
    User.findOneAndDelete({ _id: `${req.params.id}` }, (err, result) => {
        if (result) {
            res.status(200).json(result)
            console.log(`Deleted ${result}`)
        } else {
            res.status(500).json(err)
            console.log("Failed to delete user")
        }
    })
})

module.exports = router