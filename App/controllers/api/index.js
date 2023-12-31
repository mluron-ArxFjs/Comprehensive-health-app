const router = require('express').Router();
const nutritionixRoute = require('./Nutritionix-controller');
const userRoute = require('./user-controller');

router.use('/nutritionix', nutritionixRoute);
router.use('/user', userRoute)

module.exports = router