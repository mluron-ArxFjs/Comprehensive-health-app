const router = require('express').Router();
const NutritionixClient = require('nutritionix');
require('dotenv').config();

const Nutritionix = new NutritionixClient({
    appKey: process.env.NUTRITIONIX_APPKEY,
    appId: process.env.NUTRITIONIX_APPID,
    url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
});

var xAppId = "appId"; 
var xAppKey = "appKey"; 
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
            host: "trackapi.nutritionix.com",
            path: "/v2/natural/nutrients?query=" + req.body.foodSearch + "&timezone=US/Central",
            
        }

        res.status(200).json(request);
        console.log("food search results", res)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error, message: 'Nutritionix failed to get the food search' });
    }
});

module.exports = router;
