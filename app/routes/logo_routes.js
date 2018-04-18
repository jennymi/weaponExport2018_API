var ObjectId = require('mongodb').ObjectId;

//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/participants', cors() ,(req, res) => {
        
        const cloud = database.db('mapdata');
        var logos = [];

        //Get data from database
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

}