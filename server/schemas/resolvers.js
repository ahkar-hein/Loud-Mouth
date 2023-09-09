const { Thought, User } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError } = require ('../utils/auth')
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('thoughts');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('thoughts');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
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
    updateUser: async (parent, { username, email, password }) => {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { username, email, password },
        { new: true }
      );
    },
    addThought: async (parent, { thoughtText, userId}) => {
      try {
        if (!userId) {
          throw new Error('You need to be logged in!');
        }
        if (User._id !== userId) {
          throw new Error('You can only add thoughts to your own account!');
        }
        const thought = await Thought.create({ thoughtText, userId });
        console.log('Created thought:', thought);
        return thought;
      } catch (err) {
        console.log(err);
      }
    },
    updateThought: async (parent, { thoughtId, thoughtText }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { thoughtText },
        { new: true, runValidators: true }
      );
    },
    addComment: async (parent, { thoughtId, commentText }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );
        return thought;
      }
      throw AuthenticationError;
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
