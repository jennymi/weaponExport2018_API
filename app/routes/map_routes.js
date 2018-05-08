// VAPENKARTA API
// Created by Team Chaos - 2018

// Petter Knutsson - petterknutsson5@gmail.com
// Viola Turesson - violaturesson@gmail.com
// Jenny Miderkvist - jenny.miderkvist@gmail.com
// Joakim Linna - joakimlinna1998@gmail.com

// var ObjectId = require('mongodb').ObjectId;

//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/map', cors() ,(req, res) => {
        const cloud = database.db('mapdata');
        var countries = [];
        var counter = 0;

        //Get correct data within mapdata
        cloud.collection('AF').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('AS').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('OC').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('EU').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('NA').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('SA').find({}).toArray((err, item) => {callBack(err, item)});
        
        function callBack(err, cloudArray) {
            if(err) {
                //if error return error string
                res.send({'error': 'An error has occured'});
            } else {
                //push data from database into array
                for (i = 0; i < cloudArray.length; i++) {
                    countries.push(cloudArray[i]);
                }

                counter++;
                if (counter == 6) {
                    console.log('server ran get')
                    res.send(countries);
                }
            }
        };
    });

    //Create
    app.post('/add', (req, res) => {
        const cloud = database.db('mapdata');

        const country = {
            country: req.body.country,
            code: req.body.code,
            FHstatus: req.body.FHstatus,
            gpi: req.body.gpi,
            info: req.body.info,
            links: JSON.parse(req.body.links),
            collection: req.body.collection,           
        };

        console.log(country);

        cloud.collection(country.collection).insert(country, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(result.ops[0]);
            }
        })

        console.log('server ran post');
    });

    //Update
    app.put('/edit/:db/:id', (req, res) => {
        const cloud = database.db('mapdata');
        oid = ObjectId(req.params.id);

        console.log('tried to update ' + req.params.id); 
        
        const country = {
            country: req.body.country,
            code: req.body.code,
            FHstatus: req.body.FHstatus,
            gpi: req.body.gpi,
            info: req.body.info,
            links: JSON.parse(req.body.links),
            collection: req.body.collection,           
        };

        cloud.collection(req.params.db).update({_id: oid},country,(err, returned) => {
                if (err) {
                    console.log(err.message);
                    res.send(err.message);
                } else {
                    console.log('updater returned: ' + returned);
                    res.send('updated item with id ' + req.params.id);
                }
        });
    });

    //Delete
    app.delete('/remove/:db/:id', (req, res) => {
        const cloud = database.db('mapdata');
        oid = ObjectId(req.params.id);

        console.log('tried to delete ' + req.params.id); 
        
        cloud.collection(req.params.db).remove({_id: oid}, (err, returned) => {
            if (err) {
                console.log(err.message);
                res.send(err.message);
            } else {
                console.log('remover returned: ' + returned);
                res.send('deleted item with id ' + req.params.id);
            }
        });
    });
}