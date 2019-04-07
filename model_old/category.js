// category_id
// department_id
// name
// description

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// category properties and validators
var categorySchema = new Schema({
    category_id: { type: Number },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    name: { type: String, required: true },
    description: { type: String, required: true },
})

module.exports = mongoose.model('Category', categorySchema)