const { Router } = require('express')
const router = Router()

const Category = require('../../model/Category')
const Department = require('../../model/Department')

// seed categories
router.get('/seed-categories', (req, res, next) => {

    console.log('seeding category 0')

    Category.find({}, (err, data) => {
        if (err) { return res.json({ status: false, err: err }) }
        
        // stops seeding when
        if (data && data.length > 0) { 

            console.log('seeding category 1')
            return res.json({ status: true, message: 'seeding is already done', category: data })


        // otherwise contine seeding
        } else {

            console.log('seeding category 2')
            // get category data
            const categories = require('../../data/category.json')

            // create a promise to find department of each category
            const promises = categories.map(async cat => {
                
                // search for the department
                let dept = await Department.findOne({ department_id : Number(cat.department_id) }).exec()

                return {
                    category_id: cat.category_id,
                    department: dept._id,
                    name: cat.name,
                    description: cat.description
                }
            })

            // now check promises for each category
            promises.forEach((promise, index) => {
                promise.then(data => {
                    
                    // insert one by one
                    Category.create(data).then((err) => {
                        if (err) {
                            return res.json({ status: false, err: err })
                        }

                        // check if this is the last one
                        if (index === promises.length-1) {
                            res.json({status: true, message:'success'})
                        }
                    })
                })
            })

            
        }
    })
})

module.exports = router