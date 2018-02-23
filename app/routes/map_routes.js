//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/map', cors() ,(req, res) => {
        var countries = [
            {
                country: 'Australia',
                code: 'AU',
                weapons: 1, 
            },
            {   
                country: 'United States',
                code: 'US',
                weapons: 10,
            }
        ]
        res.send(countries);        

        console.log('server ran get');
    });

    app.post('/add', (req, res) => {
        const cloud = database.db('mapdata');

        const country = {
            country: req.body.country,
            code: req.body.code,
            weapons: req.body.weapons,
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
        console.log('added a country');
    });
}