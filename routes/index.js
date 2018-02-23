'use strict'

const routes = require('express').Router();
// const express = require('express')
// const app = express()

app.get('/', (req, res) => {
    res.send(`I Love Hacktiv8!`);
});

routes.use('/models', models);

routes.get('/', (req, res) => {
    res.send(`I Love Hacktiv8!`);
});

module.exports = routes;