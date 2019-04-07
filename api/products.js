const { Router } = require('express')
const router = Router()
const { 
    Product,
    ProductCategory,
    Category,
    Department,
    ProductAttribute,
    AttributeValue,
    Attribute,
    sequelize 
} = require('../database')

// const Product = require('../model/product')

// list all products here
router.get('/products', (req, res) => {
    // prepare properties
    var query = {}
    var limit = 50
    var page = 1


    // search by keywords
    if (req.query.keywords) {
        query = {
            [sequelize.Op.or]: {
                name: {[sequelize.Op.like]: '%'+ req.query.keywords +'%'},
                description: {[sequelize.Op.like]: '%'+ req.query.keywords +'%'}
            }
        }
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

    // sets relationship here
    // Product.hasMany(Category)

    Product.paginate({
        include: [{
                model: ProductCategory, 
                include: [
                    { model: Category, include: [ Department ] }
                ]  
        }],
        page: page,
        paginate: limit,
        where: query
    }).then(data => {
        res.json({ status: true, result: data })
    })
})

router.get('/products/:id/:slug', (req, res) => {

    let slug = req.params.slug
    let id = req.params.id

    Product.find({
        include: [{
            model: ProductCategory, 
            include: [
                { model: Category, include: [ Department ] }
            ]  
        }, {
            model: ProductAttribute,
            include: [
                { model: AttributeValue, include: [Attribute] }
            ]
        }],
        where: { product_id: id }
    })

    // if success
    .then(data => {
        // validate slug here
        if (data.slug !== slug) {
            res.json({ status: false, message: 'slug does not match' })
        }

        Product.findAll({
            include: [{
                model: ProductCategory,
                where: { category_id: {[sequelize.Op.in]: data.ProductCategories.map(_ => _.category_id)} }
            }],
        }).then(products => {
          res.json({ status: true, product: data, related: products })  
        })


    })

    // catch any error here
    .catch(err => {
        res.json({ status: false, error: err })
    })


    // let populator = { 
    //     path: 'category', 
    //     populate: { 
    //         path: 'department',
    //         model: 'Department'
    //     }
    // }

    // Product
    //     .findOne({product_id: id, slug: slug})
    //     .populate(populator)
    //     .populate('attributes')
    //     .exec((err, data) => {
            
    //         if (err)
    //             res.json({ status: false, error: err })

            
    //         Product
    //             .find({category: data.category})
    //             .populate(populator)
    //             .exec((err, products) => {
    //                 if (err) res.json({ status: false, error: err })

    //                 res.json({ status: true, product: data, related: products })
    //             })
    //     })

})
router.post('/products', (req, res) => {})
router.put('/products/:id', (req, res) => {})
router.delete('/products/:id', (req, res) => {})

module.exports = router