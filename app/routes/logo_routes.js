var ObjectId = require('mongodb').ObjectId;

//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/participants', cors() ,(req, res) => {
        
        //Get data from correct database
        const cloud = database.db('mapdata');
        var logos = [];

        //Get data within mapdata
        cloud.collection('logos').find({}).toArray((err, item) => {callBack(err, item)});
        
        function callBack(err, cloudArray) {
            if(err) {
                //if error return error string
                res.send({'error': 'An error has occured'});
            } else {
                //push data from database into array
                for (i = 0; i < cloudArray.length; i++) {
                    logos.push(cloudArray[i]);
                    console.log(cloudArray[i]);
                }

                //send array with data from database
                res.send(logos);
            }
        };
    });

    //Create
    app.post('/addpart', (req, res) => {
        const cloud = database.db('mapdata');

        const logo = {
            img: req.body.img,
            participantTitle: req.body.title,
            info: req.body.info,
            logoLinks: JSON.parse(req.body.links),           
        };

        console.log(logo);

        cloud.collection('logos').insert(logo, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(result.ops[0]);
            }
        })

        console.log('server ran post');
    });

    //Delete
    app.delete('/removepart/:id', (req, res) => {
        const cloud = database.db('mapdata');
        oid = ObjectId(req.params.id);

        console.log('tried to delete ' + req.params.id); 
        
        cloud.collection('logos').remove({_id: oid}, (err, returned) => {
            if (err) {
                console.log(err.message);
                res.send(err.message);
            } else {
                res.send('deleted item with id ' + req.params.id);
            }
        });
    });
}