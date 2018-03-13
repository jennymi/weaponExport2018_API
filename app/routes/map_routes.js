//add function to exports
module.exports = function(app, cors, database) {
    //handles get request at localhost:1137/map
    app.get('/map', cors() ,(req, res) => {
        const cloud = database.db('mapdata');

        cloud.collection('EU').find({}).toArray((err,item) =>{
            if(err) {
                res.send({'error': 'An error has occured'});
            } else {
                console.log(item);
                res.send(item);
            }
        });

        // var countries = [{"_id":"5a8e90a1713af322b468928a","country":"Norway","code":"NO","weapons":"50","info":"Mellan 2011 och 2014 exporterade Sverige krigsmateriel till Norge för 2,798 miljarder kronor.  Mellan 2001 och 2010 uppgick den totala krigsmaterielexporten till landet till 2,5 miljarder kronor. \n\nSverige har bland annat exporterat ammunition till tunga kulsprutor, delar till granatgevär samt pansarvapen till Norge.\n\nDen norska armén använder ett flertal svenska stridsfordon: artillerisystemet Archer, bandvagnen BV 206 och Stridsfordon 90, som bland annat används av norska trupper i Afghanistan.\n\n2011 fick Norge tre ansökningar om vidareexport av svenskt krigsmateriel beviljade av ISP. Dessa ansökningar gällde bland annat pansarbandvagnar, som Norge nu får sälja vidare till Finland och Litauen.","links":"http://www.regeringen.se/sveriges-regering/utrikesdepartementet/sveriges-diplomatiska-forbindelser/europa-och-centralasien/norge/"}];

        // res.send(countries);

        console.log('server ran get');
    });

    app.post('/add', (req, res) => {
        const cloud = database.db('mapdata');

        const country = {
            country: req.body.country,
            code: req.body.code,
            FHstatus: req.body.FHstatus,
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