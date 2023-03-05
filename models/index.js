const User = require('./User.js');
const Blog = require('./Blog.js');
const Comment = require('./Comment.js');

// one to many - User:Blog
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

// one to many - Blog:Comment
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };