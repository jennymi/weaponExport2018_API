//add map_routes as required
const mapRoutes = require('./map_routes');
//add stats_routes as required
const statsRoutes = require('./stats_routes');
//add logo_routes as required
const logoRoutes = require('./logo_routes');

//add this function to exports
module.exports = function(app, cors, database) {
    mapRoutes(app, cors, database);
    statsRoutes(app, cors, database);
    logoRoutes(app, cors, database);
}
