const router = require('express').Router();
const NutritionixClient = require('nutritionix');
const axios = require('axios');
require('dotenv').config();

const Nutritionix = new NutritionixClient({
    appKey: process.env.NUTRITIONIX_APPKEY,
    appId: process.env.NUTRITIONIX_APPID,
    url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
});

var xAppId = process.env.NUTRITIONIX_APPID;
var xAppKey = process.env.NUTRITIONIX_APPKEY;
var xRemoteUserId = "0";
var contentType = "application/json";

router.post('/search', async (req, res) => {
    try {

        var request = {
            method: "POST",
            headers: {
                "Content-Type": contentType,
                "x-app-id": xAppId,
                "x-app-key": xAppKey,
                "x-remote-user-id": xRemoteUserId
            },
            host: "https://trackapi.nutritionix.com",
            path: "/v2/natural/nutrients",

        }
        const results = await axios({
            method: "POST",
            headers: {
                "Content-Type": contentType,
                "x-app-id": xAppId,
                "x-app-key": xAppKey,
                "x-remote-user-id": xRemoteUserId
            },
            url: request.host + request.path,
            data: {query: req.body.foodSearch}
        });
        res.status(200).json(results.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: 'Nutritionix failed to get the food search' });
    }
});
module.exports = router;
