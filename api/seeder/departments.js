const { Router } = require('express')
const router = Router()

const Department = require('../../model/Department')

// seed departments
router.get('/seed-departments', (req, res, next) => {

    console.log('seeding department 0')

    Department.find({}, (err, data) => {
        if (err) { return res.json({ status: false, err: err }) }
        
        // stops seeding when
        if (data && data.length > 0) { 

            console.log('seeding department 1')
            return res.json({ status: true, message: 'seeding is already done', department: data })


        // otherwise contine seeding
        } else {

            console.log('seeding department 2')
            // get department data
            const departments = require('../../data/department.json')


            // insert all departments
            Department.create(departments, (err, depts) => {
                if (err) { return res.json({ status: false, err: err }) }

                res.json({status: true, message:'success', departments: depts})
            })
        }
    })
})

module.exports = router