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
  media: {
    type: String,
    trim: true
  },
  user: 
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],

  topic: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
    },


  reactions: [
    {
     
        type: Schema.Types.ObjectId,
        ref: 'User',
      
    },
  ],

});

thoughtSchema.virtual('commentCount').get(function () {
  return this.comments.length;
})

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
