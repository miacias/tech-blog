const router = require('express').Router();
const { User } = require('../../models');

// authenticate user login to store in session
router.post('/', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'Unauthorized access. Please check your username and password.' });
            return;
        }
        const passwordCheck = userData.checkPassword(req.body.password)
        if (!passwordCheck) {
            res.status(400).json({ message: 'Unauthorized access. Please check your username and password.' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.id;
            res.status(200).json(userData); // .save is async so info must be sent here
            //const loginHisory = await Login.something() save login timestamp to database
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;