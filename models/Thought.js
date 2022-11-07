const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const formatDate = require('../utils/formatDate')

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
            get: createdAtVal => formatDate(createdAtVal)
        },
        //this is the user who created it, via ID and cookies?
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

module.exports = Thought