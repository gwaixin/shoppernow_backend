const { Router } = require('express')
// const mongoose = require('mongoose')
const router = Router()

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