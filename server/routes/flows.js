const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');//https://express-validator.github.io/docs/

const User = require('../models/User');
const Flow = require('../models/Flow');

// @route     GET api/flows
// @desc      Get all users flows
// @access    Private
router.get('/', auth, async (req, res) => {
    // res.send('Get all flows');
    try {
        const flows = await Flow.find({ user: req.user.id }).sort({
            date: -1
        });
        res.json(flows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/flows
// @desc      Add new contact
// @access    Private use auth and express-validator/check'=> multiple middleware
router.post(
    '/',
    [
        auth,
        [
            check('flowName', 'flowName is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        // res.send('Add flows');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { flowName, elements: el, connections: con, date } = req.body;
        console.log('req.body ', req.body);

        try {
            const newFlow = new Flow({
                flowName,
                elements: [...el],
                connections: [...con],
                date,
                user: req.user.id
            });
            //put to the db
            const flow = await newFlow.save();
            //return flow to the client
            res.json(flow);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route     PUT api/flows/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
    // res.send('Update flows');
    const { flowName, elements: el, connections: con, date } = req.body;
    console.log('req.body ', req.body);
    const { id, name, valid, age, color, top, left } = el;
    const { elIdFrom, elIdTo } = con;


    try {
        const newFlow = new Flow({
            _id: req.flow.id,
            flowName,
            elements: [...el],
            connections: [...con],
            date,
            user: req.user.id
        })
        let flow = await Flow.findById(req.params.id);
        console.log({ flow });

        if (!flow) return res.status(404).json({ msg: 'flow not found' });

        // Make sure user owns flow
        console.log(flow.user);
        if (flow.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        flow = await Flow.findByIdAndUpdate(
            req.params.id,
            { $set: newFlow },
            { new: true } // if this flow does not exists let create it
        );
        res.json(flow);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     DELETE api/flows/:id
// @desc      Delete flow
// @access    Private
router.delete('/:id', auth, async (req, res) => {
    // res.send('Delete flows');
    try {
        let flow = await Flow.findById(req.params.id);
        console.log({ flow });

        if (!flow) return res.status(404).json({ msg: 'flow not found' });

        // Make sure user owns flow
        if (flow.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Flow.findByIdAndRemove(req.params.id);

        res.json({ msg: 'flow removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;