const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date, default: Date.now,
            get: createdAtVal => {
                const newDate = new Date(createdAtVal)
                return `${new Date(newDate).getMonth() + 1}/${new Date(newDate).getDate()}/${new Date(newDate).getFullYear()}`
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],

    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);


ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)
Thought.find({}).exec((err, collection) => {
    if (collection.length == 0) {
        Thought.insertMany([
            {
                thoughtText: "Wooooooooooooooo noSQL",
                username: "john123"
            },
            {
                thoughtText: "noSQL lol",
                username: "sally"
            },
            {
                thoughtText: "i like mongo",
                username: "tom"
            }
        ],
            (insertErr) => {
                if (insertErr) {
                    handleError(insertErr)
                }
            })
    }
})

module.exports = Thought