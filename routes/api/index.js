const router =require('express').Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

const thoughtsRoutes = require('./thoutsRoutes');
router.use('/thoughts', thoughtsRoutes);

// const reactionsRoutes = require('./reactionsRoutes');
// router.use('/reactions', reactionsRoutes);

module.exports = router;