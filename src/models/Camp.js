const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Camp = new Schema({
    campName: String,
    wells: []
});


module.exports = mongoose.model('Camp', Camp);