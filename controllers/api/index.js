const router = require('express').Router();
const { User, Login } = require('../../models');

// authenticate user login to store in session
router.post('/login', async (req, res) => {
    console.log('hello backend login')
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
        const passwordCheck = await userData.checkPassword(req.body.password);
        if (!passwordCheck) {
            res.status(400).json({ message: 'Unauthorized access. Please check your username and password.' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.id;
            res.status(201).json(userData); // .save is async so info must be sent here
            //const loginHisory = await Login.create() save login timestamp to database
            // try {
            //     const loginHistory = Login.create({
            //         user_id: req.body.username
            //     });
            //     console.log(loginHistory);
            // } catch (err) {
            //     console.error(err);
            // }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// saves new user to DB
router.post('/signup', async (req, res) => {
    console.log('hello signup backend')
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        const plainUser = newUser.get({plain: true});
        console.log(plainUser)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(201).json(plainUser);
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;