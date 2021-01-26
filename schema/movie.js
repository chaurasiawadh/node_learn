const Joi = require('joi');
const movieDetailsSchema = Joi.object().keys({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().optional(),
    director: Joi.string().required(),
    actors: Joi.string().required(),
    language: Joi.string().required(),
    id: Joi.optional(),
  });
  module.exports = movieDetailsSchema;
