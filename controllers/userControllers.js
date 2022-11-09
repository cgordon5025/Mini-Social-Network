const { User, Thought } = require('../models')

module.exports = {
    getAllUser(req, res) {
        User.find({}, (err, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                console.log("encountered an error")
                res.status(500).json(err)
            }
        })
    },
    getSingleUser(req, res) {
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
    },
    newUser(req, res) {
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
    },
    updateUser(req, res) {
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
    },
    async deleteUser(req, res) {
        const userData = await User.findById({ _id: req.params.id })
        console.log(userData)
        if (userData) {
            await User.deleteOne({_id: req.params.id})
            await Thought.deleteMany({ 'username': userData.username })
            res.status(200).json({ message: "user deleted" })
        } else {
            res.stauts(500).json(err)
        }
    },
    addFriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: { friends: req.params.friendId }
        }, (err, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(500).json(err)
            }
        })

    },
    deleteFriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $pull: { friends: req.params.friendId }
        }, (err, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(500).json(err)
            }
        })

    }

}