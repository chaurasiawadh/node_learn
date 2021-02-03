const Joi = require('joi');

const validString = Joi.string().required();

const peopleSchema = Joi.object({
    name: validString,
    dob: validString,
    dod: validString,
    emailId: Joi.string().email().required(),
    gender: validString,
    language: validString,

});

module.exports = { peopleSchema };
