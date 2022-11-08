const router = require('express').Router()
const { Thought } = require('../../models')

router.get('/', async (req, res) => {
    Thought.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result)
        } else {
            console.log("encountered error")
            res.status(500).json(err)
        }
    })
})

router.get('/:id', async (req, res) => {
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
})

router.post('/', async (req, res) => {
    const newThought = new Thought({
        "thoughtText": req.body.thoughtText,
        "username": req.body.username,
        "userId": `find something that returns the userId`
    })
    newThought.save()
    if (newThought) {
        res.status(200).json(newThought)
    } else {
        console.log("encountered an error")
        res.status(500).json(err)
    }
})

router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate({
        _id: `${req.params.id}`
    }, {
        $set: {
            "thoughtText": req.body.thoughtText,

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

router.delete('/:id', (req, res) => {
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
})
module.exports = router