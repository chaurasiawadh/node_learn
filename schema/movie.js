const Joi = require('joi');
const movieDetailsSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().optional(),
  directors: Joi.string().required(),
  actors: Joi.string().required(),
  language: Joi.string().required(),
});

const updateMovieDetailsSchema = Joi.object({
  title: Joi.string(),
  year: Joi.number(),
  genre: Joi.string().optional(),
  directors: Joi.string(),
  actors: Joi.string(),
  language: Joi.string(),
});

module.exports = { movieDetailsSchema, updateMovieDetailsSchema };
