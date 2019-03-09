const { Router } = require('express')
const router = Router()

const Attribute = require('../../model/Attribute')

// seed attribute
router.get('/seed-attributes', (req, res) => {
    Attribute.find({}, (err, data) => {
        if (err) return res.json({ status: false, err: err })

        // stops seeding when attribute already seeded
        if (data && data.length > 0) {
            return res.json({ status: true, message: 'seeding is already done', attributes: data })
        }


        // get attributes data
        const attributes = require('../../data/attribute.json')

        Attribute.create(attributes, (err, attrs) => {
            if (err) return res.json({ status: false, err: err })

            res.json({ status: true, message: 'seeding success', attributes: attrs })
        })
    })
})

module.exports = router