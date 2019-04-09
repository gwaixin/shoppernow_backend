const { Router } = require('express')
const router = Router()
const { connection, Shipping, Tax, Order, OrderDetail } = require('../database')


router.get('/orders/taxes', (req, res) => {
    Tax.findAll()

    // success
    .then(data => {
        res.json({ status: true, taxes: data })
    })

    // fail
    .catch(err => {
        res.json({ status: false, error: err })
    })
})

router.get('/orders/shippings', (req, res) => {
    Shipping.findAll({})

    // success
    .then(data => {
        res.json({ status: true, shippings: data })
    })

    // fail
    .catch(err => {
        res.json({ status:false, error: err })
    })

})

router.get('/orders', (req, res) => {

    if (!req.customer) return res.json({ status: false, message: 'No user found', code: 401 })

    Order
    .findAll({ 
        include: [OrderDetail, Shipping, Tax],
        where: {customer_id: parseInt(req.customer.customer_id)} 
    })

    // success 
    .then(data => {
        res.json({ status: true, orders: data, customer: req.customer})
    })

    // fail
    .catch(err => {
        res.json({ status: false, error: err })
    })
})

router.put('/orders/:id/:status', (req, res) => {
    let params = {
        inOrderId: req.params.id,
        inStatus: req.params.status,
    }

    // update status
    connection.query(
        'CALL orders_update_status (:inOrderId, :inStatus)',
        { replacements: params }
    )

    // success
    .then(data => {
        res.json({ status: true, message: 'update success' })
    })

    // fail
    .catch(err => {
        res.json({ status: false, message: 'update failed', error: err })
    })
})

router.put('/orders', (req, res) => {
    if (!req.customer) return res.json({ status: false, message: 'No user found' })

    const stripe = require("stripe")("sk_test_2mHv6GogtXMY12H13M2m0C7u")
    const body = req.body
    if (
        !body.token ||
        !body.currency ||
        !body.amount ||
        !body.description
    ) {
        return res.json({ status: "fail", message: "checkout payment failed invalid params"})
    }


    // create charge
    const charge = stripe.charges.create({
        amount: body.amount,
        currency: body.currency,
        source: body.token, // obtained with Stripe.js
        description: body.description
    }, (err, charge) => {
        if (err) {
            return res.json({ status: false, error: err})
        }

        if (charge.status === "succeeded") {

            const replacements = {
                inOrderId: body.orderId,
                inStatus: 1, // change to paid status
                inComments: 'Order has been paid',
                inAuthCode: body.token,
                inReference: charge.invoice
            }

            // update status
            connection.query(
                'CALL orders_update_order (:inOrderId, :inStatus, :inComments, :inAuthCode, :inReference)',
                { replacements: replacements }
            )

            // success
            .then(data => {
                res.json({ status: true, data: data })
            })

            // fail
            .catch(err => {
                res.json({ status: false, error: err })
            })

        } else {
            res.json({ status: false, message: charge.failure_message})
        }
    })


})

router.post('/orders', (req, res) => {
    if (!req.customer) return res.json({ status: false, message: 'No user found' })

    const order = req.body
    order.inCustomerId = req.customer.customer_id

    connection.query(
        'CALL shopping_cart_create_order (:inCartId, :inCustomerId, :inShippingId, :inTaxId)',
        { replacements: order }
    )

    // sucess
    .then(data => {
        res.json({ status: true, order: data })
    })

    // fail
    .catch(err => {
        res.json({ status: false, error: err })
    })

})

module.exports = router