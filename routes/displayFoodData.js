const express = require('express')
const router = express.Router()

router.post('/displayFoodData', async (req, res) => {
    if (global.foodData.length > 0) {
        res.send({
            foodData: global.foodData,
            foodCategory: global.foodCategory
        })
    } else {
        res.send({
            error: 'No data found for display'
        })
    }
})

module.exports = router
