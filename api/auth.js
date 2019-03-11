const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')

const User = require('../model/User')

// auth login
router.post('/auth/signin', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    User
        .findOne({ email: email })
        .exec((err, user) => {
            if (err) { return res.json({ status: false, error: err }) }

            if (!user) { return res.json({ status: false, message: 'Email does not found' }) }

            if (!user.comparePassword(user.password, password)) { return res.json({ status: false, message: 'Email and password does not match' }) }

            let token = jwt.sign({
                user: user
            }, 'vfr4nhy6', { 
                expiresIn : 60*60*2 // 2 hours
            })

            res.json({ status: true, message: 'Signin success', token: token })
        })
})

// auth check
router.post('/auth/check', (req, res) => {
    res.json({ status: true, user: req.user })
})

module.exports = router