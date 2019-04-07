// attribute_value_id [Optional]
// type [Required] -> color, size
// value [Required] -> value of attribute type

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// attribute properties and validators
const attributeSchema = new Schema({
    attribute_value_id: { type: Number },
    type: { type: String, required: true },
    value: { type: String, required: true }
})

module.exports = mongoose.model('Attribute', attributeSchema)