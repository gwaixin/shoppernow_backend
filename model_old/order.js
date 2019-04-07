// total_amount
// created_on
// shipped_on
// status          // 0: unpaid, 1: paid, 2: shipping, 3: shipped, 4: done
// comments
// user
// shipping
// tax
// details:        // [{product, attributes, product_name, quantity, unit_cost}]

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    total_amount: { type: Number, required: true },
    created_on: { type: Date, default: new Date()},
    shipped_on: { type: Date, required: true },
    status: { type: Number, min:0, max:10, default: 0 },
    comments: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    shipping: { type: Schema.Types.ObjectId, ref: 'Shipping', required: true },
    tax: { type: Object, required: true },
    details: [{type: Object, required: true}]
})

module.exports = mongoose.model('Order', OrderSchema)