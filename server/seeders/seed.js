const db = require('../config/connection');
const { User, Thought, Comment, Topic } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const topicSeeds = require('./topicSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Comment.deleteMany({});
    await Topic.deleteMany({});

    await User.create(userSeeds);

    await Thought.create(thoughtSeeds);

    await Comment.create(commentSeeds);

    await Topic.create(topicSeeds);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    db.close();
  }

  console.log('All done!');
  process.exit(0);
});
