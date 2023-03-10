const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');


// renders login page for user to sign up or log in
router.get('/login', (req, res) => {
    // sends to home page if already connected
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

// get home page with all blog posts
router.get('/', async (req, res) => {
    console.log("GET: home", req.session.user_id, req.session.logged_in)
    try {
        const allBlogs = await Blog.findAll({
            attributes: ['id', 'title', 'date_created'],
            order: [['date_created', 'DESC']],
            include: {
                model: User,
                attributes: ['id', 'username'],
            }
        });
        if (!allBlogs) {
            res.status(404).json({ message: 'No blogs available!' });
            return;
        };
        // turns each data object into plain text
        const home = allBlogs.map((blog) => {
            return blog.get({ plain: true });
        });
        res.render('home', {
            home,
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
            blogReader: req.session.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// get dashboard with all blog posts from one user
router.get('/:username', withAuth, async (req, res) => {
    try {
        const oneUser = await User.findOne({
            where: { username: req.params.username },
            attributes: ['id', 'username'], // user info included
            include: // other model info included
            {
                model: Blog,
                attributes: ['id', 'title', 'date_created']
            }
        });
        if (!oneUser) {
            res.status(404).json({ message: 'Not found!' });
            return; // need return to exit OR use if/else to correctly block off code
        };
        // res.send(oneUser) // to test via Insomnia before Views are built
        const dashboard = oneUser.get({ plain: true }); // converts data to JavaScript object
        res.render('dashboard', {
            dashboard,
            loggedIn: req.session.logged_in, // sends session status (true/false)
            userId: req.session.user_id,
            blogReader: req.session.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// get one blog post from one user
router.get('/:username/blogs/:id', withAuth, async (req, res) => {
    console.log("GET: one blog", req.session.user_id, req.session.logged_in)
    try {
        const oneBlog = await Blog.findOne({
            // https://stackoverflow.com/questions/38821389/sequelize-query-with-where-inside-include
            where: {
                '$user.username$': req.params.username,
                id: req.params.id
            },
            attributes: ['id', 'title', 'text_content', 'date_created'], // blog info included
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'] // user info included
                },
                {
                    model: Comment,
                    attributes: ['id', 'text_content', 'user_id', 'date_created'], // comment info included
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                }
            ]
        });
        // console.log(oneBlog);
        if (!oneBlog) {
            res.status(404).json({ message: 'Not found!' });
            return;
        };
        // res.send(oneBlog); // to test via Insomnia before Views are built
        const blog = oneBlog.get({ plain: true }); // converts data to JavaScript object
        res.render('blog', {
            blog,
            blogAuthor: blog.user.username,
            loggedIn: req.session.logged_in, // sends session status (true/false)
            userId: req.session.user_id,
            blogReader: req.session.username
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

/* it is possible to create a /api route to check which users
are currently logged in based on session id as an extra feature */

module.exports = router;