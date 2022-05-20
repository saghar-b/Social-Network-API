const router = require('express').Router();
// const { User,Event } = require('../models');

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);
router.use(homeRoutes);

router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;
