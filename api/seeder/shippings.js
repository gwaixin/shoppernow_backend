const { Router } = require('express')
const router = Router()

const Shipping = require('../../model/Shipping')

// seed shippings
router.get('/seed-shippings', (req, res) => {
    Shipping.find({}, (err, data) => {
        if (err) return res.json({ status: false, error: err })

        // stops seeding when shipping already seeded
        if(data && data.length > 0) {
            return res.json({ status: true, message: 'seeding is already done', shippings: data })
        }

        // get shippings data
        const shippings = require('../../data/shipping.json')
        Shipping.create(shippings, (err, data) => {
            if (err) return res.json({ status: false, error: err })

            res.json({ status: true, message: 'success seeding', shippings: data })
        })
        
    })
})

module.exports = router