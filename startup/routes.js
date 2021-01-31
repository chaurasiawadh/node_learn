const routes = require('../router/movie');
const express = require("express");
module.exports = (app) => {
    app.use(express.json());
    app.get('/', (req, res) => res.send("Welcone movies database"));    
    app.use('/movies', routes);
    app.use('*', (req, res) => res.send("Route not found"));  
}