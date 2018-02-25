const express = require('express');
const routes = express.Router();

routes.get('/', function(request,response) {
    response.send(`I Love Hacktiv8!`);
});

module.exports = routes;
