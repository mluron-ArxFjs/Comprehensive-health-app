const router = require('express').Router();
const apiRouter= require('./api');
const viewRouter= require('./view-controller');

router.use('/', viewRouter);
router.use('/api', apiRouter);

module.exports = router