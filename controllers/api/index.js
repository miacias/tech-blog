const router = require('express').Router();
const { User, Blog, Login } = require('../../models');

// authenticate user login to store in session
router.post('/users/login', async (req, res) => {
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
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            console.log("POST: login", req.session.user_id, req.session.logged_in)
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
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;
            console.log("POST: signup", req.session.user_id, req.session.logged_in)
            res.status(201).json(newUser);
        })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// creates a new blog
router.post('/blogs', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.blogTitle,
            text_content: req.body.blogText,
            user_id: req.session.user_id
        });
        if ( newBlog.title && newBlog.text_content && newBlog.user_id) {
            res.status(201).json(newBlog);
        };
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

module.exports = router;