const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema({
    commentText: {
        type: String,
        required: 'You need to leave a comment!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    thoughtId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
})

const Comment = model('Comment', commentSchema);

module.exports = Comment;