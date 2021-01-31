const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    directors: String,
    actors: String,
    language: String,
})

module.exports = mongoose.model('movies', movieSchema);