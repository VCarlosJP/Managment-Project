const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const Activity = new Schema({
    InitialHour: Number,
    InitialMin: Number,
    InitialTime: String,
    Category: String,
    FinalHour: Number,
    FinalMin: Number,
    FinalTime: String,
    Activity: String,
    Hours: String
});

module.exports = mongoose.model('Activity', Activity);