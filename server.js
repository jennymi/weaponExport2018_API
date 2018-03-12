//add required packages
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
//create app and set port
const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//connect to mongodb
mongoClient.connect(db.url, (err, database) => {
    if(err) return console.log(err);

    //tell server to use our routing
    require('./app/routes')(app, cors, database);

    //let the app listen to requests @ localhost:1137/
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});