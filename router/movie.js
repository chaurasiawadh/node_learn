const routes = require('express').Router();
const { getMoviesAPI, postMoviesAPI, patchMoviesAPI, deleteMoviesAPI } = require('../controller/movie')

routes
  .get('/', getMoviesAPI)
  .post('/', postMoviesAPI)
  .patch('/', patchMoviesAPI)
  .delete('/', deleteMoviesAPI)

module.exports = routes;
