const routes = require('express').Router();
const { getMoviesAPI, postMoviesAPI, patchMoviesAPI, deleteMoviesAPI, getSingleMovieAPI } = require('../controller/movie')

routes
  .get('/', getMoviesAPI)
  .get('/:id', getSingleMovieAPI)
  .post('/', postMoviesAPI)
  .patch('/:id', patchMoviesAPI)
  .delete('/:id', deleteMoviesAPI)

module.exports = routes;
