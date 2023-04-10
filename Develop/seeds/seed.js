const sequelize = require('../config/connection');
const { User, BlogPost, Comments} = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPost of blogPostData) {
    await BlogPost.create({
      ...blogPost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comments of commentData) {
    await Comments.create({
      ...comments,
      user_id: users[Math.floor(Math.random() * users.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();