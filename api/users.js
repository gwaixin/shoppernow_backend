const { Router } = require('express')
const router = Router()
const { connection, Customer } = require('../database')
const jwt = require('jsonwebtoken')

// const User = require('../model/User')

// list all users here
router.get('/users', (req, res) => {
    // prepare properties
    const limit = 50
    const page = 1

    // User.paginate({}, {
    //     page: page,
    //     limit: limit
    // }, (err, users) => {
    //     if (err) { return res.json({ status: false, error: err }) }

    //     res.json({
    //         status: true,
    //         users: users
    //     })
    // })
})

// get users detail here
router.get('/users/:id', (req, res) => {
    let id = req.params.id

    // User
    //     .findOne({ _id: mongoose.Types.ObjectId(id) })
    //     .exec((err, user) => {
    //         if (err) { return json({ status: false, error: err }) }

    //         res.json({
    //             status: true,
    //             user: user
    //         })
    //     })
})

// add users here
router.post('/users', (req, res) => {

    // validate password
    if (req.body.password !== req.body.password_confirm) {
        return res.json({ status: false, message: 'Password does not match'})
    }

    const data = {
        inName: req.body.name,
        inEmail: req.body.email,
        inPassword: req.body.password
    }

    connection.query(
        'CALL customer_add (:inName, :inEmail, :inPassword)',
        { replacements: data }
    )
    // success
    .then(data => {
        res.json({ status: true, user: data })
    })

    // error
    .catch(err => {
        // print the error details
        res.json({ status: false, error: err })
    })


    // var user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // console.log('user daw :', user)

    // user.save((err, data) => {
    //     if (err) { return res.json({ status: false, error: err }) }

    //     res.json({ status: true, user: data })
    // })
})

// update user here
router.put('/users', (req, res) => {

    Customer.update(req.body, {
        where: { customer_id: req.body.customer_id }
    })

    .then(data => {
        if (data) {

            let token = jwt.sign({
                customer: req.body
            }, 'vfr4nhy6', { 
                expiresIn : 60*60*2 // 2 hours
            })

            res.json({ status: true, user: req.body, token: token})
        } else {
            throw new Error("customer not found");
        }
    })

    .catch(err => {
        res.json({ status: false, error: err })
    })

    // User.findOneAndUpdate({
    //     _id: mongoose.Types.ObjectId(req.body._id)
    // }, req.body, { new: true }, (err, user) => {
    //     if (err) return res.json({ status: false, error: err })


    //     // otherwise return success result
    //     res.json({ status: true, user: user})
    // })
})

// delete user here
// router.delete()

module.exports = router