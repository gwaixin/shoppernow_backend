// product_id
// user_id
// attributes
// quantity
// buy_now
// added_on

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute'}],
    quantity: { type:Number, required: true},
    buy_now: { type:Boolean, default: true, required: true},
    added_on: { type: Date, default: new Date()},
})

module.exports = mongoose.model('Cart', CartSchema)