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
            match: /.+\@.+\..+/,
        },
        //reference the thoughts
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);
// UserSchema.virtual('friendCount').get(function () {
//     return this.friends.length
// })
//the User in quotes is the name of our model in the document
const User = model('User', UserSchema)

//lets get some seed data in here
User.find({}).exec((err, collection) => {
    if (collection.length == 0) {
        User.insertMany([
            {
                username: "john123",
                email: "john123@gmail.com"
            },
            {
                username: "tom",
                email: "tom@gmail.com"
            },
            {
                username: "sally",
                email: "sally@gmail.com"
            }
        ],
        //will flag the error
            (insertErr) => {
                if (insertErr) {
                    handleError(insertErr)
                }
            })
    }
})

module.exports = User