const express = require('express');
const router = express.Router();


const Task = require('../models/Task');


router.get('/tasks', async (req, res) => {
    const tasks = await Task.find(); //Cuando se termine de hacer la consulta se guarda en la consulta
    res.json(tasks);
   
});

router.post('/task', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: 'ok'
    });
});

router.put('/:id', async (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Task Updated'
    });
});

router.delete('/:id', async (req, res) => {
    Task.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Task Deleted'
    });
})




module.exports = router;