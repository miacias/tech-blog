// sequelize models
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

// raw JSON starter data files
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  // seeds users
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // seeds blogs
  const blogs = await Blog.bulkCreate(blogData, {
    individualHooks: true,
    returning: true,
  });
  // seeds comments randomly (on a random blog by a random user)
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
    });
  };
  // ends MySQL connection
  process.exit(0);
};

seedDatabase();