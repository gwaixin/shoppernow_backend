const { Router } = require('express')
const router = Router()

const Product = require('../model/product')

// list all products here
router.get('/products', (req, res) => {
    // prepare properties
    var query = {}
    var limit = 50
    var page = 1


    // search by keywords
    if (req.query.keywords) {
        query.name = new RegExp(req.query.keywords, "i")
    }

    // check filtered category
    if (req.query.categories) {
        query.category = { "$in" : req.query.categories }  
    }


    // optional override condition
    if (req.query.limit) {
        limit = Number(req.query.limit)
    }

    // set active page
    if (req.query.page) {
        page = Number(req.query.page)
    }


    Product.paginate(query, {
        page: page,
        limit: limit,
        populate: {
            path: 'category',
            populate: {
                path: 'department',
                model: 'Department'
            }
        }
    }, (err, result) => {
        if (err) {

            res.json({ status: false, error: err })

        } else {
            res.json({ 
                status: true, 
                result: result
            })
        }
    })
})

router.get('/products/:id/:slug', (req, res) => {

    let slug = req.params.slug
    let id = req.params.id
    let populator = { 
        path: 'category', 
        populate: { 
            path: 'department',
            model: 'Department'
        }
    }

    Product
        .findOne({product_id: id, slug: slug})
        .populate(populator)
        .populate('attributes')
        .exec((err, data) => {
            
            if (err)
                res.json({ status: false, error: err })

            
            Product
                .find({category: data.category})
                .populate(populator)
                .exec((err, products) => {
                    if (err) res.json({ status: false, error: err })

                    res.json({ status: true, product: data, related: products })
                })
        })

})
router.post('/products', (req, res) => {})
router.put('/products/:id', (req, res) => {})
router.delete('/products/:id', (req, res) => {})

module.exports = router