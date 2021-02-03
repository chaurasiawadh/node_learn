const moveieRoutes = require('../router/movie');
const peopleRoute = require('../router/people');
const express = require("express");
module.exports = (app) => {
    app.use(express.json());
    app.get('/', (req, res) => res.send("Welcone movies database"));    
    app.use('/movies', moveieRoutes);
    app.use('/people',peopleRoute);
    app.use('*', (req, res) => res.send("Route not found"));  
}