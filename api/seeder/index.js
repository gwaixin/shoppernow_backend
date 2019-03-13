const express = require('express')
const seeder = express()

const products = require('./products')
const categories = require('./categories')
const departments = require('./departments')
const attributes = require('./attributes')
const shippings = require('./shippings')

seeder.use(products)
seeder.use(categories)
seeder.use(departments)
seeder.use(attributes)
seeder.use(shippings)

module.exports = seeder