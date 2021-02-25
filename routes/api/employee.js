const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Employee = require('../../models/employee');

router.post(
    '/',
    check('name', 'Name is required').notEmpty(),
    check('address', 'Address is required').notEmpty(),
    check('phoneNumber', 'Phone number is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, address, phoneNumber, acccountNumber, salary} = req.body;

        try{
            employee = new Employee({
                name,
                address,
                phoneNumber,
                acccountNumber,
                salary
            });
    
            employee.save();
            res.send('Add Employee Success');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }

    }
)

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ name: 1});
        res.json(employees);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.patch(
    '/:id', 
    check('name', 'Name is required').notEmpty(),
    check('address', 'Address is required').notEmpty(),
    check('phoneNumber', 'Phone number is required').notEmpty(),
    async (req,res) => {
    try {
        
        const {name, address, phoneNumber, salary} = req.body;

        const employee = await Employee.findById(req.params.id);

        employee.name = name;
        employee.address = address;
        employee.phoneNumber = phoneNumber;
        employee.salary = salary;

        await employee.save();

        res.json(employee);
        
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if(!employee) {
            return res.status(404).json({msg: 'Employee not found'});
        }

        await employee.remove();

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;