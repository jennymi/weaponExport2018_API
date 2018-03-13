//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/map', cors() ,(req, res) => {
        const cloud = database.db('mapdata');
        var countries = [];
        var counter = 0;

        cloud.collection('AF').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('AS').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('OC').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('EU').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('NA').find({}).toArray((err, item) => {callBack(err, item)});
        cloud.collection('SA').find({}).toArray((err, item) => {callBack(err, item)});
        
        function callBack(err, cloudArray) {
            if(err) {
                res.send({'error': 'An error has occured'});
            } else {
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

    app.post('/add', (req, res) => {
        const cloud = database.db('mapdata');

        const country = {
            country: req.body.country,
            code: req.body.code,
            FHstatus: req.body.FHstatus,
            gpi: req.body.gpi,
            info: req.body.info,
            links: req.body.links,           
        };

        cloud.collection(req.body.collection).insert(country, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(result.ops[0]);
            }
        })
        console.log('server ran post');
    });
}