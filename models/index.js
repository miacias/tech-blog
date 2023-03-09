const User = require('./User.js');
const Blog = require('./Blog.js');
const Comment = require('./Comment.js');
const Login = require('./Login.js');

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

// one to many - User: Comment
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// ----- EXTRA FEATURE (incomplete) -----

// one to many - User:Login History
User.hasMany(Login, {
  foreignKey: 'user_id'
});

Login.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Blog, Comment, Login };