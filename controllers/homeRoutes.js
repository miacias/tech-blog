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
        }
        // res.send(oneUser) // to test via Insomnia before Views are built
        const dashboard = oneUser.get({ plain: true }); // converts data to JavaScript object
        // console.log(dashboard)
        res.render('dashboard', { 
            dashboard,
            loggedIn: req.session.loggedIn // sends session status (true/false)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login') // render login page

// it is possible to create a /api route to check which users
// are currently logged in based on session id

module.exports = router;