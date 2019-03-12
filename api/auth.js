const { Router } = require('express')
const mongoose = require('mongoose')
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

// auth change password
router.put('/auth/password', (req, res) => {
    if (!req.user) {
        return res.json({ status: false, message: 'Session expired, please sign in' })
    }

    // validate password
    if (req.body.password_new !== req.body.password_confirm) {
        return res.json({ status: false, message: 'Password does not match'})
    }

    User
        .findOne({_id: mongoose.Types.ObjectId(req.user._id)})
        .exec((err, user) => {
            if (err) return res.json({ status: false, error: err })

            if (!user) return res.json({ status: false, message: 'No user found'})

            if (!user.comparePassword(user.password, req.body.password)) 
                return res.json({ status: false, message: 'Old password does not match' })

            // let pass = user.encryptPassword(req.body.password_new)

            user.password = req.body.password_new
            user.save((err, data) => {
                if (err) return res.json({ status: false, error: err })

                res.json({ status: true, user: data })
            })
        })
    
})

module.exports = router