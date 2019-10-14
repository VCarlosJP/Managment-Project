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

const Activities = new Schema({
    year: Number,
    month: Number,
    day: Number,
    activity: []
});



module.exports = mongoose.model('Activity', Activity);
module.exports = mongoose.model('Activities', Activities);