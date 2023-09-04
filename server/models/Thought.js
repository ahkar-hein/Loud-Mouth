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
    ref: 'User'
  },
  commentText: [
    {
      type: String,
      required: true,
      ref: 'Comment'
    }
  ],

  reactionBody: [
    {
      type: String,
      required: true,
      ref: 'Reaction'
    }
  ],

  topicBody: {
    type: String,
    ref: 'Topic',
  }

});

thoughtSchema.virtual('commentCount').get(function () {
  return this.commentText.length;
})
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactionBody.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
