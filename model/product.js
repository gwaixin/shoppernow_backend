// product_id
// name
// description
// price
// discounted_price
// image
// image_2
// thumbnail
// display

const mongoose = require('mongoose')
const slugify = require('slugify')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

// products properties and validators
var productSchema = new Schema({
    product_id: {type: Number},
    name: {type: String, required: true, trim:true, maxlength: 100},
    description: {type: String, required: true, trim:true, maxlength: 10000},
    price: {type: Number, required: true},
    discounted_price: {type: Number, required: true, default: '0.00'},
    image: {type: String},
    image_2: {type: String},
    thumbnail: {type: String},
    display: {type: Number, required: true, default: 0},
    slug: {type: String},
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    attributes: [{ type: Schema.Types.ObjectId, ref: 'Attribute' }],
})

productSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { remove: /[*+~.()'"!:@]/g, lower: true });

    next();
});

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', productSchema)