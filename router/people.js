const routes = require('express').Router();
const { getPeopleAPI, postPeopleAPI} = require('../controller/people')

routes
.get('/', getPeopleAPI)
.post('/', postPeopleAPI)

module.exports = routes;
