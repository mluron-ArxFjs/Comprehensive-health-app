const router = require('express').Router();
const Nutritionix = require('nutritionix');
require('dotenv').config();

router.post('/search', async (req, res) => {
    try {
        const Nutritionix = new Nutritionix({
            clientAPI: process.env.NUTRITIONIX_APPKEY,
            clientID: process.env.NUTRITIONIX_APPID,
            Url: 'https://api.nutritionix.com/v1_1/search'
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: 'Nutritionix failed to get the food search' });
    }
});

module.exports = router;    