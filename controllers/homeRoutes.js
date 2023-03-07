const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// get dashboard for one user
router.get('/:username', async (req, res) => {
    try {
        const oneUser = await User.findOne({
            where: { username: req.params.username },
            attributes: ['id', 'username'], // user info included
            include: // other model info included
            {
                model: Blog,
                attributes: ['title', 'date_created']
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
            loggedIn: req.session.loggedIn // sends session status (true/false)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get a user's blog by ID
router.get('/:username/blogs/:id', async (req, res) => {
    try {
        const oneBlog = await User.findOne({
            // https://stackoverflow.com/questions/38821389/sequelize-query-with-where-inside-include
            where: {
                username: req.params.username,
                '$blogs.id$': req.params.id
            },
            attributes: ['id', 'username'], // user info included
            include: { // blog info included
                model: Blog,
                attributes: ['id', 'title', 'text_content', 'date_created']
            }
        });
        if (!oneBlog) {
            res.status(404).json({ message: 'Not found!' });
            return;
        };
        // res.send(oneBlog); // to test via Insomnia before Views are built
        const blog = oneBlog.get({ plain: true }); // converts data to JavaScript object
        // console.log(blog)
        res.render('blog', { 
            blog,
            loggedIn: req.session.loggedIn // sends session status (true/false)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/login') // render login page

// it is possible to create a /api route to check which users
// are currently logged in based on session id

module.exports = router;