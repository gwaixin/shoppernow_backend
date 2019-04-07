// department_id
// name
// description

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// department properties and validators
var departmentSchema = new Schema({
    department_id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, required: true }
})


module.exports = mongoose.model('Department', departmentSchema)