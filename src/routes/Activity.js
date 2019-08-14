const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');



const Activity = require('../models/Activity');


router.get('/Activities', async (req, res) => {
    const Activities = await Activity.find(); //Cuando se termine de hacer la consulta se guarda en la consulta
    res.json(Activities);
    
   
});

router.post('/Activity', async (req, res) => {
    const activity = new Activity(req.body);
    await activity.save();
    res.json({
        status: 'ok'
    });
});

// router.put('/:id', async (req, res) => {
//     Task.findByIdAndUpdate(req.params.id, req.body);
//     res.json({
//         status: 'Task Updated'
//     });
// });



router.delete('/delete/:id', function (req, res, next) {
    Activity.findByIdAndDelete({_id:req.params.id}).then(function(activity){
        res.json({status: 'deleted'})
    });
    
    
});




module.exports = router;