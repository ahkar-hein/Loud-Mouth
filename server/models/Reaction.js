const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280 //validate for max string length as 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    userId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    thoughtId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    commentId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
});


const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
