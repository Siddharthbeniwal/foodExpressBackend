const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { findOne } = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'thisIsAJwtSecretKey'

router.post('/userLogin',
    body('email', 'Invalid email').isEmail(),
    body('password', 'Invalid password').isLength({ min: 6 }),
    async (req, res) => {

        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: 'Invalid credentials'
                })
            }

            const reqEmail = req.body.email
            const reqPassword = req.body.password
            const userData = await User.findOne({ email: reqEmail })

            if (!userData) {
                return res.status(400).json({
                    errors: 'User email does not exist.'
                })
            }

            const isPwdMatched = await bcrypt.compare(reqPassword, userData.password)
            if (!isPwdMatched) {
                return res.status(400).json({
                    errors: 'Incorrect password'
                })
            }


            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET_KEY)

            return res.json({
                success: true,
                userData,
                authToken: authToken
            })
        } catch (err) {
            return res.json({
                error: err
            })
        }
    })

module.exports = router;