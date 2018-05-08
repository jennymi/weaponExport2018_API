// VAPENKARTA API
// Created by Team Chaos - 2018

// Petter Knutsson - petterknutsson5@gmail.com
// Viola Turesson - violaturesson@gmail.com
// Jenny Miderkvist - jenny.miderkvist@gmail.com
// Joakim Linna - joakimlinna1998@gmail.com

var ObjectId = require('mongodb').ObjectId;

//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/stats
    app.get('/stats', cors() ,(req, res) => {
        //Retrieves correct database
        const cloud = database.db('mapdata');
        var points = [];

        //Get correct data within mapdata
        cloud.collection('points').find({}).toArray((err, item) => {callBack(err, item)});
        
        function callBack(err, cloudArray) {
            if(err) {
                //if error return error string
                res.send({'error': 'An error has occured'});
            } else {
                //push data from database into array
                for (i = 0; i < cloudArray.length; i++) {
                    points.push(cloudArray[i]);
                }

                //send array with data from database
                res.send(points);
            }
        };
    });

    app.post('/addstats', (req, res) => {
        const cloud = database.db('mapdata');
        console.log(req.body);
        const year = {
            year: req.body.year,
            code: req.body.code,
            weapons: req.body.weapons,
            info: req.body.info,
            statLinks: JSON.parse(req.body.links),
        };

        cloud.collection('points').insert(year, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(result.ops[0]);
            }
        })
        console.log('server ran post');
    });

    app.put('/editstat/:id', (req, res) => {
        const cloud = database.db('mapdata');
        oid = ObjectId(req.params.id);

        console.log('tried to update ' + req.params.id); 
        
        const year = {
            year: req.body.year,
            code: req.body.code,
            weapons: req.body.weapons,
            info: req.body.info,
            statLinks: JSON.parse(req.body.links),
        };

        cloud.collection('points').update({_id: oid},year,(err, returned) => {
                if (err) {
                    console.log(err.message);
                    res.send(err.message);
                } else {
                    console.log('updater returned: ' + returned);
                    res.send('updated item with id ' + req.params.id);
                }
        });
    });

    app.delete('/removestat/:id', (req, res) => {
        const cloud = database.db('mapdata');
        oid = ObjectId(req.params.id);

        console.log('tried to delete ' + req.params.id); 
        
        cloud.collection('points').remove({_id: oid}, (err, returned) => {
            if (err) {
                console.log(err.message);
                res.send(err.message);
            } else {
                res.send('deleted item with id ' + req.params.id);
            }
        });
    });
}