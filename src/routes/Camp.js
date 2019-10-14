const express = require('express');
const router = express.Router();


const Camp = require('../models/Camp');

router.post('/camp', async (req, res) => {
    const camp = new Camp(req.body);
    await camp.save();
    res.json({
        status: 'ok'
    });
});

router.get('/camps', async (req, res) => {
    const camps = await Camp.find();
    res.json(camps);
      
});

module.exports = router;