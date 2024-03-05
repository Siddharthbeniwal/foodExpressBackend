const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

router.post('/createOrder',
    async (req, res) => {
        const isExistingUser = await Order.findOne({ email: req.body.email })
        if (isExistingUser === null) {
            try {
                await Order.create({
                    email: req.body.email,
                    username: req.body.username,
                    orderData: [{
                        orderDate: req.body.orderDate,
                        data: req.body.orderData
                    }]
                }).then(() => {
                    res.send({
                        success: true,
                        successMsg: 'First Order saved!'
                    })
                })
            } catch (error) {
                res.send({
                    success: false,
                    error: error.message
                })
            }
        } else {
            try {
                await Order.findOneAndUpdate({ email: req.body.email },
                    {
                        $push: {
                            orderData: {
                                orderDate: req.body.orderDate,
                                data: req.body.orderData
                            }
                        }
                    }
                ).then(() => {
                    res.send({
                        success: true,
                        successMsg: 'New Order saved!'
                    })
                })
            } catch (error) {
                res.send({
                    success: false,
                    error: error.message
                })
            }
        }
    })

module.exports = router;
