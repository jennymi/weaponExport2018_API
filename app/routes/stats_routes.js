var ObjectId = require('mongodb').ObjectId;

//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/stats', cors() ,(req, res) => {
        
        const cloud = database.db('mapdata');
        var points = [];

        //Get data from database
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