// shipping_type
// shipping_cost
// shipping_region

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShippingSchema = new Schema({
    shipping_type: {type: String, required: true},
    shipping_cost: {type: String, required: true},
    shipping_region: {type: String, required: true},
    shipping_days: {type: Number, required: true}
})

module.exports = mongoose.model('Shipping', ShippingSchema)