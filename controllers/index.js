const router = require('express').Router();
const homeRoutes = require('./homeRoutes.js');
const apiRoutes = require('./api');
const blogRoutes = require('./blogRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;