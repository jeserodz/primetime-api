const api = require('express').Router();

api.use('/movies', require('./movies'));

module.exports = api;
