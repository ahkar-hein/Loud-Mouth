const { Thought, User, Comment, Topic } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require ('../utils/auth')
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('thoughts');
    },
    userComment: async (parent, {userId}) => {
      return User.findOne({_id: userId})
    },
    thoughts: async () => {
      return Thought.find().populate('user').populate('comments').populate('topics');
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId }).populate('comments').populate('user');
    },
    comments: async () => {
      return Comment.find()
    },
    topics: async () => {
      return Topic.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { firstname, lastname, username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          firstname,
          lastname,
          username,
          email,
          // store hashed password
          password: hashedPassword,
        });
        await user.save();
        const token = signToken(user);
        return {token, user};
      } catch (err) {
        throw new Error('Something went wrong!');
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user)
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { userId, username, email, password, imageSrc }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { username, email, password, imageSrc },
        { new: true }//add imageSrc
      );
    },
    addThought: async (parent, { thoughtText, media, userId, topicId }) => {
      try {
        if (!userId) {
          throw new Error('You need to be logged in!');
        }
        if (!topicId) {
          throw new Error('You need to choose one topic!');
        }
    
        const thought = await Thought.create({
          thoughtText,
          media: media,
          user: userId, 
          topics: topicId, 
        });
        const user = await User.findOneAndUpdate({_id: userId}, {$addToSet: {thoughts: thought._id}}, {runValidators: true, new: true})
        console.log('Created thought:', thought);
        return thought;
      } catch (err) {
        console.log(err);
        throw new Error('Something went wrong while creating the thought.');
      }
    },
    
    updateThought: async (parent, { thoughtId, thoughtText }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { thoughtText },
        { new: true, runValidators: true }
      );
    },
      addComment: async (parent, { commentText, userId, thoughtId }) => {
        try {
          const newComment = await Comment.create({
            commentText: commentText,
            userId: userId,
            thoughtId: thoughtId,
          });
  
          await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { comments: newComment._id } },
            { new: true }
          );
  
          return newComment;
        } catch (error) {
          throw new Error('Failed to create a new comment');
        }
      },
      addReaction: async (parent, { thoughtId, userId }, context) => {
        try {
          const thought = await Thought.findOne({ _id: thoughtId });
      
          if (!thought) {
            throw new Error('Thought not found');
          }
      
          const existingReaction = thought.reactions.find(
            (reaction) => reaction.userId.toString() === userId
          );
      
          if (existingReaction) {
            throw new Error('User has already reacted to this thought');
          }
      
          thought.reactions.push({
            userId: userId,
          });
      
          await thought.save();
      
          return thought;
        } catch (error) {
          throw new Error('Failed to add reaction: ' + error.message);
        }
      },
      
      removeThought: async (parent, { thoughtId }, context) => {
        // const { user } = context; 
  
        try {
          const thought = await Thought.findById(thoughtId);
  
          if (!thought) {
            throw new Error('Thought not found');
          }
  
          // if (thought.userId.toString() !== user.id) {
          //   throw new AuthenticationError('You are not authorized to remove this thought');
          // }
  
          await thought.deleteOne();
  
          return thought; 
        } catch (error) {
          throw new Error(error.message);
        }
      },
    removeComment: async (parent, { thoughtId, commentId }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};


module.exports = resolvers;
