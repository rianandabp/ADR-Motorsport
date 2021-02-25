const express = require('express');

const { check, validationResult } = require('express-validator');
const router = express.Router();
const Project = require('../../models/project');
const Item = require('../../models/item');

router.post(
    '/',
    check('carModel','Car model is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('owner', 'Owner is required').notEmpty(),
    check('plateNumber', 'Plate number is required').notEmpty(),
    async (req,res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {carModel, description, owner, plateNumber} = req.body;

        try{
            project = new Project({
                carModel,
                description,
                owner,
                plateNumber
            });

            project.save();
            res.send('Add project success');

        } catch (err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)

router.patch(
    '/:id', 
    check('carModel','Car model is required').notEmpty(),
    check('description', 'Description is required').notEmpty(),
    check('owner', 'Owner is required').notEmpty(),
    check('plateNumber', 'Plate number is required').notEmpty(),
    async (req,res) => {
    try {
        
        const {carModel, description, owner, plateNumber, status, startDate, endDate} = req.body;

        const project = await Project.findById(req.params.id);

        project.carModel = carModel;
        project.description = description;
        project.owner = owner;
        project.plateNumber = plateNumber;
        project.status = status;
        project.startDate = startDate;
        project.endDate = endDate;

        await project.save();

        res.json(project);
        
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ name: 1});
        res.json(projects);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.put('/work/:id', async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);

        project.workDetail.unshift(req.body);

        project.totalPrice += req.body.price;

        await project.save();

        return res.json(project.workDetail);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/work/:id/:work_id', async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);

        const work = project.workDetail.find(
            (work) => work.id === req.params.work_id
        );

        if(!work) {
            return res.status(404).json({msg: 'Work not found'});
        }

        project.workDetail = project.workDetail.filter(
            ({ id }) => id !== req.params.work_id
        );

        project.totalPrice -= work.price;

        await project.save();

        res.json(project.workDetail);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/item/:id', async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);


        console.log(req.body.item);
        project.itemUsed.unshift(req.body);

        const item = await Item.findById(req.body.item);

        item.quantity -= req.body.quantity;

        project.totalPrice += item.price * req.body.quantity;
        await item.save();

        await project.save();

        return res.json(project.itemUsed);
        
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/item/:id/:item_id', async (req,res) => {
    try {
        const project = await Project.findById(req.params.id);

        const item = project.itemUsed.find(
            (item) => item.id === req.params.item_id
        );

        const itemPrice = await Item.findById(item.item);

        if(!item) {
            return res.status(404).json({msg: 'Item not found'});
        }

        project.itemUsed = project.itemUsed.filter(
            ({ id }) => id !== req.params.item_id
        );

        project.totalPrice -= itemPrice.price * item.quantity;

        await project.save();

        res.json(project.itemUsed);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;