const { Schema, Types } = require('mongoose');

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true

        }
    }
)