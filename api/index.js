const express = require('express')
const api = express()

// const seeder = require('./seeder/index')
const products = require('./products')
const categories = require('./categories')
const departments = require('./departments')
const users = require('./users')
const auth = require('./auth')
const carts = require('./carts')
const orders = require('./orders')

const authenticating = require('../middlewares/authenticating')


// api seeders
// api.use(seeder)

// middleware handshake auth if provided
api.use(authenticating)

// other routes
api.use(products)
api.use(categories)
api.use(departments)
api.use(users)
api.use(auth)
api.use(carts)
api.use(orders)

api.get('/test', (req, res) => {
    res.json({response: true, message: 'testing only'})
})

module.exports = api