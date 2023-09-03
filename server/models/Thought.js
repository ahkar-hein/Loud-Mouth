const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
    ref: 'user'
  },
  comment: {
    type: String,
    required: true,
    ref: 'comment'
  }
});

thoughtSchema.virtual('commentCount').get(function () {
    return this.comment.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
