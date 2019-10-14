const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');



const Activity = require('../models/Activity');
const Activities = require('../models/Activity');



/** When user clicks a  */

router.get('/Activities/:date/:month/:year', async (req, res) => {
    // const Activities = await Activity.find(); //Cuando se termine de hacer la consulta se guarda en la consulta
    // res.json(Activities);
    const activities = await Activities.findOne({ year: 19});
    res.json(activities);
    console.log(activities);

      
});








router.post('/Activity', async (req, res) => {
    const activity = new Activity(req.body);
    await activity.save();
    res.json({
        status: 'ok'
    });
});

// router.post('/addStuff/:date/:month/:year', async (req, res) => {
//     const newActivity = await Activities.findOne({ day: });

//     if(newActivity != null){
//         res.json({status: 'Document already exist'});
//     }
//     else{
//         const activity = new Activities(req.body);
//         await activity.save();
//         res.json({
//             status: 'ok'
//         });
//     }


// });

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