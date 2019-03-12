const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')

const Cart = require('../model/cart')

// get cart
router.get('/cart', (req, res) => {
    console.log('here 1')
    if (!req.user) return res.json({ status: false, message: 'No user found' })

    console.log('here 2')
    Cart
        .find({ user_id: mongoose.Types.ObjectId(req.user._id) })
        .populate('attributes')
        .populate({
            path: 'product_id',
            populate: {
                path: 'attributes',
                model: 'Attribute'
            }
        })
        .sort('-date')
        .exec((err, data) => {
            console.log('here 3')
            if (err) return res.json({ status: false, error: err })
            console.log('here 4')
            res.json({ status: true, cart: data })
        })
})

// add cart
router.post('/cart', (req, res) => {

    if (!req.user) return res.json({ status: false, message: 'No user found' })

    const cart = new Cart({
        product_id: mongoose.Types.ObjectId(req.body.product),
        user_id: mongoose.Types.ObjectId(req.user._id),
        attributes: [mongoose.Types.ObjectId(req.body.color), mongoose.Types.ObjectId(req.body.size)],
        quantity: req.body.quantity,
    })

    cart.save((err, data) => {
        if (err) return res.json({ status: false, error: err })

        res.json({ status: true, cart: data })
    })
})

router.put('/cart', (req, res) => {
    Cart.findOneAndUpdate({
        // query by id
        _id: mongoose.Types.ObjectId(req.body.id)

    // update data
    }, {
        attributes: [mongoose.Types.ObjectId(req.body.color), mongoose.Types.ObjectId(req.body.size)],
        quantity: req.body.quantity
        // buy_now TODO
    
    // response
    }, { new: true }, err => {
        if (err) return res.json({ status: false, error: err })

        // find cart with populated data
        Cart
        .findOne({ _id: mongoose.Types.ObjectId(req.body.id) })
        .populate('attributes')
        .populate({
            path: 'product_id',
            populate: {
                path: 'attributes',
                model: 'Attribute'
            }
        })
        .exec((err, item) => {
            if (err) return res.json({ status: false, error: err })

            res.json({ status: true, item: item})
        })
    })
})

// remove cart
router.delete('/cart/:id', (req, res) => {


    Cart.findOneAndDelete({
        _id: mongoose.Types.ObjectId(req.params.id)
    }, err => {
        if (err) return res.json({ status: true, error: err })

        res.json({ status: true })
    })
})

module.exports = router