'use strict'

const express = require('express');

const app = express();
const routes = express.Router();

routes.post('/', (request, response) => {
    console.log(request.body);
    // response.render('index.ejs')
})

routes.get('/', (request, response) => {
    response.render('index.ejs');
});

module.exports = routes;