const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Minuta = new Schema({
    camp: String,
    well: String,
    name: String,
    dateCreated: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Minuta', Minuta);