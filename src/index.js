//Server Code
const express = require('express');
const morgan = require('morgan');
const mongoose = require ('mongoose');

//Routes
const routes = require('./routes/Activity');
//const routes = require('./routes/tasks.js');

const app = express();


mongoose.connect('mongodb://localhost/ManagmentProject')
    .then(db => {
        console.log("DB is connected");
        
    })
    .catch(err => console.log(err));


//Settings

app.set('port', process.env.PORT || 3000);

//Middlewares

app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use(routes);

//Static Files
app.use(express.static(__dirname + '/public'));


app.listen(3000,'192.168.0.16' , () => {
    console.log("Server is Working");
});

