const { User, Thought, Reaction } = require('../models')

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({}, (err, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                console.log("encountered error")
                res.status(500).json(err)
            }
        })
    },
    getSingleThought(req, res) {
        Thought.findOne({
            _id: `${req.params.id}`
        }, (err, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                console.log('encountered error')
                res.status(500).json(err)
            }
        })
    },
    async newThought(req, res) {
        const newThought = await new Thought({
            "thoughtText": req.body.thoughtText,
            "username": req.body.username,
        })
        newThought.save()
        console.log(newThought)
        if (newThought) {
            await User.findOneAndUpdate({
                username: req.body.username
            }, {
                $set: { thoughts: newThought._id }
            }
            )
            console.log(res)
            res.status(200).json(newThought)
        } else {
            console.log(res)
            console.log("encountered an error")
            res.status(500).json(err)
        }
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: `${req.params.id}`
        }, {
            $set: {
                "thoughtText": req.body.thoughtText,
                "username": req.body.username
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
    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: `${req.params.id}`
        }, (err, result) => {
            if (result) {
                res.status(200).json(result)
            } else {
                console.log("oops error")
                res.status(500).json(err)
            }
        })
    },
    reactToThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        },
            {
                $set: { reactions: req.body }
            }, (err, result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(500).json(err)
                }
            })

    },
    deleteReaction(req, res) {
        console.log(req.params.reactionId)
        Thought.findOneAndUpdate({
            _id: req.params.id
        },
            {
                $pull: { reactions: { reactionId: req.body.reactionId } }
            }, (err, result) => {
                if (result) {
                    res.status(200).json(result)
                } else {
                    res.status(500).json(err)
                }
            })

    },
}