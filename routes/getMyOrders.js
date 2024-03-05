const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

router.post('/getMyOrders', async (req, res) => {

    try {
        const userData = await Order.findOne({ email: req.body.email })

        if (userData === null) {
            res.send({
                error: 'No orders created yet.'
            })
        }
        else {
            if (userData.orderData.length > 0) {
                res.json({
                    orderData: userData.orderData
                })
            } else {
                res.send({
                    error: 'Server error'
                })
            }
        }
    } catch (error) {
        res.send({
            error: error
        })
    }
})

module.exports = router
