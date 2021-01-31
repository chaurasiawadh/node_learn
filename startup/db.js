const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movie_adda', { 
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('mongoose connected');
    })
    .catch(err => console.error(err));