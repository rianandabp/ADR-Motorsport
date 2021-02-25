const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Item = require('../../models/item');

router.post(
    '/',
    check('category','Category is required').notEmpty(),
    check('name', 'Name is required').notEmpty(),
    async (req,res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {category, name, quantity, price} = req.body;

        try{
            item = new Item({
                category,
                name,
                quantity,
                price
            });

            item.save();
            res.send('Add item success');

        } catch (err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ name: 1});
        res.json(items);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.patch(
    '/:id', 
    check('name', 'Name is required').notEmpty(),
    check('category', 'Category is required').notEmpty(),
    check('price', 'Price is required').notEmpty(),
    check('quantity', 'Quantity is required').notEmpty(),
    async (req,res) => {
    try {
        
        const {name, category, price, quantity} = req.body;

        const item = await Item.findById(req.params.id);

        item.name = name;
        item.category = category;
        item.price = price;
        item.quantity = quantity;

        await item.save();

        res.json(item);
        
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const item = await Item.findById(req.params.id);

        if(!item) {
            return res.status(404).json({msg: 'Item not found'});
        }

        await item.remove();

        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;