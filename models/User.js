const { Schema, Types, model } = require('mongoose');
//establishing the new schema for users
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        //reference the thoughts
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }],
        friends: [this]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})
//the User in quotes is the name of our model in the document
const User = model('User', UserSchema)

module.exports = User