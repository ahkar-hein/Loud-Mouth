const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
    firstname: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    imageSrc: {
        type: String,
        unique: false,
        required: false,
    }
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
})

const User = model('User', userSchema);

module.exports = User;