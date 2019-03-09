const { Router } = require('express')
const router = Router()

const Category = require('../../model/Category')
const Attribute = require('../../model/Attribute')
const Product = require('../../model/product')

// seed produces
router.get('/seed-products', (req, res, next) => {

    console.log('seeding products 0')

    Product.find({}, (err, data) => {
        if (err) { return res.json({ status: false, err: err }) }
        
        // stops seeding when
        if (data && data.length > 0) { 

            console.log('seeding products 1')
            return res.json({ status: true, message: 'seeding is already done', products: data })


       
        }

        // otherwise contine seeding by step

        console.log('seeding products 2')
        // get product data
        const products = require('../../data/product.json')
        const prodcats = require('../../data/product_category.json')
        const prodattrs = require('../../data/product_attribute.json')

        // 1. fetch all attributes

        Attribute.find({}, (err, attrs) => {
            if (err) res.json({ status: false, err: err })


            // create a promise to find categories of each products
            const promises = products.map(async prod => {

                // find the right index category
                let pcindex = prodcats.findIndex(pc => pc.product_id == prod.product_id)

                // search for category
                let cat = await Category.findOne({ category_id : Number(prodcats[pcindex].category_id) }).exec()
                prod.category = cat._id

                // filter attributes for specific product
                let filattrs = prodattrs.filter(pa => pa.product_id == prod.product_id)

                // get each _id of filtered attribute
                let attributes = filattrs.map(attr => {
                    // find index of the attributes fetched from db
                    let index = attrs.findIndex(a => a.attribute_value_id == attr.attribute_value_id)

                    return attrs[index]._id
                })
                
                // sets attributes
                prod.attributes = attributes
                


                return prod
            })

            // now check promises for each products
            promises.forEach((promise, index) => {
                promise.then(data => {

                    // insert all products
                    Product.create(data, err => {

                        if (err) { return res.json({ status: false, err: err }) }

                        // check if this is the last one
                        if (index === promises.length-1) {
                            res.json({status: true, message:'success'})
                        }
                    })
                })
            })

        })

        
    })
})

module.exports = router