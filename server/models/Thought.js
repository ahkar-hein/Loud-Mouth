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
  commentText: [
    {
      type: String,
      required: true,
      ref: 'comment'
    }
  ],

  reactionBody: [
    {
      type: String,
      required: true,
      ref: 'reaction'
    }
  ],

  topicBody: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic',
  }

});

thoughtSchema.virtual('commentCount').get(function () {
  return this.commentText.length;
})
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactionBody.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
