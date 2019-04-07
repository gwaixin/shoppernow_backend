const { Router } = require('express')
// const mongoose = require('mongoose')
const router = Router()

// const Cart = require('../model/cart')
// const Order = require('../model/Order')
// const Shipping = require('../model/Shipping')

const Tax = {
    tax_1: {tax_type: 'Sales Tax at 8.5%', tax_percentage: 8.50},
    tax_2: {tax_type: 'No Tax', tax_percentage: 0.00},
}

const STATUS = {
    0: 'unpaid',
    1: 'paid',
    2: 'shipping',
    3: 'shipped',
    4: 'done'
}

router.get('/orders/taxes', (req, res) => {
    // res.json({ status: true, taxes: Tax })
})

router.get('/orders/shippings', (req, res) => {
    // Shipping.find({}).exec((err, data) => {
    //     if (err) return res.json({ status: false, error: err })

    //     res.json({ status: true, shippings: data })
    // })
})

router.get('/orders', (req, res) => {

    // if (!req.user) return res.json({ status: false, message: 'No user found' })

    // Order
    //     .find({user: req.user._id})
    //     .exec((err, data) => {
    //     if (err) return res.json({ status: false, error: err })

    //     res.json({ status: true, orders: data })
    // })
})

router.post('/orders', (req, res) => {
    // if (!req.user) return res.json({ status: false, message: 'No user found' })

    // const order = req.body
    // order.user = req.user._id

    // // add date on shipped on
    // let date = new Date()
    // date.setDate(date.getDate() + order.days)
    // order.shipped_on = date

    // Order.create(order, (err, data) => {
    //     if (err) return res.json({ status: false, error: err })

    //     // TODO delete cart here
    //     Cart.deleteMany({ 
    //         _id: {$in: (order.carts).map(mongoose.Types.ObjectId)}
    //     }, err => {
    //         if (err) return res.json({ status: false, error: err })

    //         res.json({ status: true, order: data })
    //     })

    // })
})

module.exports = router