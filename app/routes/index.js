//add map_routes as required
const mapRoutes = require('./map_routes');

//add this function to exports
module.exports = function(app, cors, database) {
    mapRoutes(app, cors, database);
}