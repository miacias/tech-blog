const router = require('express').Router();
const loginRoutes = require('./loginRoutes.js');

router.use('/login', loginRoutes);

module.exports = router;