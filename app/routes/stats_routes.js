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

    // app.post('/addStats', (req, res) => {
    //     const cloud = database.db('mapdata');

    //     const year = {
    //         year: req.body.year,
    //         weapons: req.body.weapons,
    //         info: req.body.info,          
    //     };

    //     cloud.collection(req.body.collection).insert(year, (err, result) => {
    //         if (err){
    //             res.send({'error': 'An error has occured'});
    //         }
    //         else {
    //             res.send(result.ops[0]);
    //         }
    //     })
    //     console.log('server ran post');
    // });


}