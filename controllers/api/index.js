const router = require('express').Router();
const { User, Login } = require('../../models');

// authenticate user login to store in session
router.post('/users/login', async (req, res) => {
    console.log('hello backend login', req.body)
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        console.log(userData)
        if (!userData) {
            res.status(400).json({ message: 'no match. Unauthorized access. Please check your username and password.' });
            return;
        }
        console.log('match passed')
        const passwordCheck = await userData.checkPassword(req.body.password);
        if (!passwordCheck) {
            res.status(400).json({ message: 'wrong pass. Unauthorized access. Please check your username and password.' });
            return;
        }
        console.log('password passed')
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
router.post('/users/signup', async (req, res) => {
    console.log('hello signup backend', req.body);
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        // const plainUser = newUser.get({plain: true});
        // console.log(plainUser)
        console.log(newUser);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            console.log(req.session)
            res.status(201).json(newUser);
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;