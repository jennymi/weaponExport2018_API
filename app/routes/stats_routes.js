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
}