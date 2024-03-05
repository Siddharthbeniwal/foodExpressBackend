// Routes has requests or endpoints for our application

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

// Whatever happens here will be reflected in db as we are using models
// we will get the user data from UI and here we will create that user's details in db
// we have to use 'User' schema here (sequence does not matter)

router.post('/createUser',
    body('username', 'Username must be atleast 3 characters').isLength({min: 3}),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be atleast 6 characters').isLength({min: 6}),
    async (req, res) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array()
            })
        }

        const reqEmail = req.body.email
        const isEmailExist = await User.findOne({email: reqEmail})
        if(isEmailExist) {
            return res.json({
                error: 'Email already exists.'
            })
        }

        const salt = await bcrypt.genSalt(7);
        const securedPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                username: req.body.username,
                email: req.body.email,
                password: securedPassword
            })
            res.json({
                success: true,
                successMsg: 'User created succesfully'
            })
        } catch (err) {
            console.log(err);
            res.json({
                success: false,
                errorMsg: err.message
            })
        }
    })

module.exports = router;