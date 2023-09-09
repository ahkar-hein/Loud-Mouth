// const db = require('../config/connection');
// const { User, Thought, Comment, Topic } = require('../models');
// const userSeeds = require('./userSeeds.json');
// const thoughtSeeds = require('./thoughtSeeds.json');
// const commentSeeds = require('./commentSeeds.json');
// const topicSeeds = require('./topicSeeds.json');

// db.once('open', async () => {
//   try {
//     await User.deleteMany({});
//     await Thought.deleteMany({});
//     await Comment.deleteMany({});
//     await Topic.deleteMany({});

//     await User.create(userSeeds);

//     await Comment.create(commentSeeds);

//     await Topic.create(topicSeeds);

//     await Thought.create(thoughtSeeds);

//     console.log('Database seeded successfully');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   } finally {
//     db.close();
//   }

//   console.log('All done!');
//   process.exit(0);
// });
/////////////////////////////////////////////////////////////
const connection = require('../config/connection');
const { User, Thought, Comment } = require('../models');

connection.on('error', (err) => console.error(err));

connection.once('open', async () => {
  console.log('connected');

  const seedData = async () => {
    try {
      await User.deleteMany({});
      await Thought.deleteMany({});
      await Comment.deleteMany({});
      // await Topic.deleteMany({});

      const users = await User.create([
        { firstname: "John", lastname: "Doe", username: 'johndoe', email: 'john@example.com', password: 'password12345' },
        { firstname: "Jane", lastname: "Smith", username: 'janesmith', email: 'jane@example.com', password: 'password123' },
      ]);

      const comments = await Comment.create([
        {
          commentText: "Good Job",
          userId: users[1]._id,
        },
        {
          commentText: "Well Done",
          userId: users[0]._id,
        },
        {
          commentText: "Testinggg",
          userId: users[1]._id,
        },
        {
          commentText: "Testinggg Comment",
          userId: users[0]._id,
        },
      ]);
      

      const thoughts = await Thought.create([
        {
          thoughtText: 'New Thought Testingggggggggggggggggggggggg ',
          user: users[0]._id,
          comments: [comments[0]._id, comments[1]._id, ],
          topicBody: "Sample Topic 2"
        },
        {
          thoughtText: 'This is testtttttttttttttttttttttt',
          user: users[1]._id,
          comments:  [comments[2]._id, comments[3]._id,],
          topicBody: "Sample Topic 1"
        },
      ]);

      console.log('Seed data inserted:', users, comments, thoughts);
    } catch (err) {
      console.error('Seed error:', err);
    } finally {
      connection.close();
    }
  };

  seedData();
});
