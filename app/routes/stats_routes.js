var ObjectId = require('mongodb').ObjectId;

//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/map', cors() ,(req, res) => {
        const cloud = database.db('statsdata');
        var point = [];
        var counter = 0;

        cloud.collection('points').find({}).toArray((err, item) => {callBack(err, item)});

        
        function callBack(err, cloudArray) {
            if(err) {
                res.send({'error': 'An error has occured'});
            } else {
                for (i = 0; i < cloudArray.length; i++) {
                    point.push(cloudArray[i]);
                }

                counter++;
                if (counter == 6) {
                    console.log('server ran get')
                    res.send(point);
                }
            }
        };
    });

    app.post('/add', (req, res) => {
        const cloud = database.db('statsdata');

        const year = {
            year: req.body.year,
            weapons: req.body.weapons,
            info: req.body.info,          
        };

        cloud.collection(req.body.collection).insert(year, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(result.ops[0]);
            }
        })
        console.log('server ran post');
    });

    app.put('/edit/:db/:id', (req, res) => {
        const cloud = database.db('statsdata');
        oid = ObjectId(req.params.id);

        console.log('tried to update ' + req.params.id); 
        
        cloud.collection(req.params.db).update({_id: oid},{
            year: req.body.year,
            weapons: req.body.weapons,
            info: req.body.info,
            }, (err, returned) => {
                if (err) {
                    console.log(err.message);
                    res.send(err.message);
                } else {
                    console.log('updater returned: ' + returned);
                    res.send('updated item with id ' + req.params.id);
                }
        });
    });

    app.delete('/remove/:db/:id', (req, res) => {
        const cloud = database.db('statsdata');
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