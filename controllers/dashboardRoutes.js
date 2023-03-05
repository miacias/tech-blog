const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// get dashboard for one user
router.get('/:username', async (req, res) => {
    try {
        const oneUser = await User.findOne({where: {username: req.params.username}}, {
            include: [
                {
                    model: Blog,
                    attributes: [ 'title', 'date_created']
                }
            ]
        });
        if (!oneUser) {
            res.status(404).json({message: 'Not found!'});
        }
        const dashboard = oneUser.get({plain: true});
        res.render('dashboard', {dashboard});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;