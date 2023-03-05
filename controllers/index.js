const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const apiRoutes = require('./api');
const blogRoutes = require('./blogRoutes.js');
const dashboardRoutes = require('./blogRoutes.js');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/blogs', blogRoutes);

module.exports = router;

/*
ROUTES PLAN:
techblog.com/ is home page
    - lists blog posts from every user and sorts by time stamp
techblog.com/username is the dashboard of a specific user
    - lists blog posts by this specific user
    - shows full blog post (title, text, time stamp)
    - option to add new blog post IF USER IS MATCHING DASHBOARD ROUTE
***techblog.com/username/blogs/95 is a specific blog post from a user on the site
    - shows full blog post (title, text, time stamp)
    - option to leave a comment IF USER IS DIFFERENT FROM BLOG POST AUTHOR
    - option to edit or delete old post IF USER IS MATCHING BLOG POST AUTHOR
techblog.com/write is a new post page
    - input form textboxes for title and blog text

API ROUTES PLAN:
- techblog.com/api is the access to the application programming interface
USERS
- techblog.com/api/users is access to list of users
- techblog.com/api/users/6 is access to specific user by ID (consider using uuidv4)
- techblog.com/api/users/login is access to list of each user's log in history
BLOGS
- techblog.com/api/blogs is access to list of all blogs
- techblog.com/api/blogs/95 is access to specific blog (and probably comments)
COMMENTS
- techblog.com/api/comments is access to list of all comments
- techblog.com/api/comments/967 is access to specific comment
*/