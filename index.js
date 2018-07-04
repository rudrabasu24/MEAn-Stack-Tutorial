/*=================================
    Import Node Modules
=================================*/

const express = require('express'); // Fast, unopinionated, minimalist web framework for node
const app = express(); // Initiate Express Application
const router = express.Router();
const port = process.env.PORT || 3030;
const mongoose = require('mongoose'); // Node tool for MongoDB
const config = require('./config/database'); // Mongoose config
const path = require('path'); //NodeJS package for file paths
// const authentication = require('./routes/authentication')(router);
const authentication = require('./routes/authentication');
const bodyParser = require('body-parser');
const validator = require('express-validator');

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Could not connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

// Provide static directory for frontend

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/client'));
app.use(require('./routes/authentication'));

// Connect server to Angular 6 Index.html
app.get('*', (req, res) => [
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
]);

// Start server listen on port 
app.listen(port, () => {
    console.log('Listening on port: ' + port);
})