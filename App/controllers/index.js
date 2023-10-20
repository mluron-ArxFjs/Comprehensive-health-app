const router = require('express').Router();
const userRouter= require('./user-controller');
const viewRouter= require('./view-controller');

router.use('/', viewRouter);
router.use('/api', userRouter);

module.exports = router