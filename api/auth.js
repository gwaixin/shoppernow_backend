const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const { Customer } = require('../database')


// auth login
router.post('/auth/signin', (req, res) => {
    let email = req.body.email
    let password = req.body.password


    Customer.find({
        where: { email: email, password: password }
    })

    // success
    .then(user => {

        if (user) {
            let token = jwt.sign({
                customer: user
            }, 'vfr4nhy6', { 
                expiresIn : 60*60*2 // 2 hours
            })

            res.json({ status: true, message: 'Signin success', token: token })
        } else {
            res.json({ status: false, message: 'Email and passwords does not match' })
        }
    })

    // error
    .catch(err => {
        res.json({ status: false, error: err })
    })


    // User
    //     .findOne({ email: email })
    //     .exec((err, user) => {
    //         if (err) { return res.json({ status: false, error: err }) }

    //         if (!user) { return res.json({ status: false, message: 'Email does not found' }) }

    //         if (!user.comparePassword(user.password, password)) { return res.json({ status: false, message: 'Email and password does not match' }) }

    //         let token = jwt.sign({
    //             user: user
    //         }, 'vfr4nhy6', { 
    //             expiresIn : 60*60*2 // 2 hours
    //         })

    //         res.json({ status: true, message: 'Signin success', token: token })
    //     })
})

// auth check
router.post('/auth/check', (req, res) => {
    res.json({ status: true, user: req.customer })
})

// auth change password
router.put('/auth/password', (req, res) => {
    if (!req.customer) {
        return res.json({ status: false, message: 'Session expired, please sign in' })
    }

    // validate password
    if (req.body.password_new !== req.body.password_confirm) {
        return res.json({ status: false, message: 'Password does not match'})
    }


    Customer
        .update({ password: req.body.password_new }, {
            // condition
            where: { 
                customer_id: req.customer.customer_id,
                password: req.body.password
            }
        })

        // success
        .then(([updated]) => {
            if (updated === 0) {
                res.json({ status: false, message: "Customer old password is invalid"})
            } else {
                res.json({ status: true, message: "done" })
            }
        })

        // fail
        .catch(err => {
            res.json({ status: false, error: err })
        })
    //     .exec((err, user) => {
    //         if (err) return res.json({ status: false, error: err })

    //         if (!user) return res.json({ status: false, message: 'No user found'})

    //         if (!user.comparePassword(user.password, req.body.password)) 
    //             return res.json({ status: false, message: 'Old password does not match' })

    //         // let pass = user.encryptPassword(req.body.password_new)

    //         user.password = req.body.password_new
    //         user.save((err, data) => {
    //             if (err) return res.json({ status: false, error: err })

    //             res.json({ status: true, user: data })
    //         })
    //     })
    
})

module.exports = router