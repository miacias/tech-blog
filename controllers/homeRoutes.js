const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// get dashboard for one user
router.get('/:username', async (req, res) => {
    try {
        const oneUser = await User.findOne({
            where: { username: req.params.username },
            attributes: ['id', 'username'],
            include:
            {
                model: Blog,
                attributes: ['title', 'date_created']
            }
        });
        if (!oneUser) {
            res.status(404).json({ message: 'Not found!' });
            return; // need return to exit OR use if/else to correctly block off code
        }
        // res.send(oneUser)
        const dashboard = oneUser.get({ plain: true });
        res.render('dashboard', { 
            dashboard,
            loggedIn: req.session.loggedIn
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