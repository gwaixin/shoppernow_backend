const { Router } = require('express')
const router = Router()
const { connection, ShoppingCart, Product } = require('../database')

// get cart
router.get('/cart', (req, res) => {

    ShoppingCart
        .findAll({
            include: [Product],
            where: {cart_id: req.query.cart_id}
        })
        .then(data => {
            res.json({ status: true, cart: data })
        })

})

// add cart
router.post('/cart', (req, res) => {

    connection.query(
        'CALL shopping_cart_add_product (:inCartId, :inProductId, :inAttributes ) ',
        { replacements: req.body} )
    .then(data => {
        res.json({ status: true, cart: data })
    })

})

router.put('/cart', (req, res) => {

    connection.query(
        'CALL shopping_cart_update (:inItemId, :inQuantity)',
        { replacements: { inItemId: req.body.item_id, inQuantity: req.body.quantity }}
    ).then(data => {
        res.json({ status: true, item: data })
    })
})

// remove cart
router.delete('/cart/:id', (req, res) => {

    connection.query(
        'CALL shopping_cart_remove_product (:inItemId) ',
        { replacements: { inItemId: req.params.id }} )
    .then(data => {
        res.json({ status: true })
    })
})

module.exports = router