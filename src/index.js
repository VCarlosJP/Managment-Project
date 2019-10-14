//Server Code
const express = require('express');
const morgan = require('morgan');
const mongoose = require ('mongoose');

const upload = require("express-fileupload");

//Routes
const routes = require('./routes/Activity');
const campRoutes = require('./routes/Camp');
const minutasPDF = require('./routes/MinutasPDF');
//const routes = require('./routes/tasks.js');

const app = express();


mongoose.connect('mongodb://localhost/ManagmentProject', { useNewUrlParser: true })
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
app.use(campRoutes);
app.use(minutasPDF);

app.use(upload());

//Static Files
app.use(express.static(__dirname + '/public'));


app.listen(app.get('port'), () => {
    console.log("Server is Working on port: "+app.get('port'));
});

