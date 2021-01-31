
const movieList = require('../moviesData.json');
const { movieDetailsSchema, updateMovieDetailsSchema } = require('../schema/movie');
const Movies = require('../models/movie');
const { isValidObjectId } = require('mongoose');

const validCheck = (req, res) => {
    const validData = movieDetailsSchema.validate(req.body);
    if (validData.error) {
        return validData.error;
    };
};
const updateValidCheck = (req, res) => {
    const validData = updateMovieDetailsSchema.validate(req.body);
    if (validData.error) {
        return validData.error;
    };
};

const findData = (title) => {
    return movieList.find(item => item.title === title);
}

const getMoviesAPI = async (req, res) => {
    try {
        const movies = await Movies.find();
        const response = {
            isSuccess: true,
            data: movies
        }
        res.send(response);
    } catch (error) {

    }
};

const getSingleMovieAPI = async (req, res) => {
    const {id} = req.params;
    try {
        const isValidId = isValidObjectId(id);
        if (!isValidId) {
            return res.status(400).send({
                isSuccess: false,
                message: 'Invalid Id',
            })
        }

        const foundMoviesById = await Movies.findById(id);
        if (!foundMoviesById) {
            return res.status(400).send({
                isSuccess: false,
                message: 'this Id is not exist.',
            })
        }

       return res.send( {
        isSuccess: true,
        data: foundMoviesById
    });
    } catch (error) {

    }
};

const postMoviesAPI = async (req, res) => {
    const validError = validCheck(req, res);
    if (validError) {
        return res.status(400).send({
            isSuccess: false,
            message: validError.details[0].message,
        })
    }
    const { title } = req.body
    const foundMovies = await Movies.findOne({ title });
    if (foundMovies) {
        return res.status(400).send({
            isSuccess: false,
            message: `${title}, this title is already exist.`
        })
    }

    const movies = await Movies.create(req.body);
    return res.status(200).send({
        isSuccess: true,
        data: movies,
        message: 'New movie created...'
    });
};

const patchMoviesAPI = async (req, res) => {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
        return res.status(400).send({
            isSuccess: false,
            message: 'Invalid Id',
        })
    }

    const validError = updateValidCheck(req, res);
    if (validError) {
        return res.status(400).send({
            isSuccess: false,
            message: validError.details[0].message,
        })
    }
    const foundMoviesById = await Movies.findById(id);
    if (!foundMoviesById) {
        return res.status(400).send({
            isSuccess: false,
            message: 'movie not found.',
        })
    }

    const { title } = req.body;
    const foundMovies = await Movies.findOne({ title });

    if (title !== foundMoviesById.title && foundMovies) {
        return res.status(400).send({
            isSuccess: false,
            message: 'this title already exist.',
        })
    }
    const resData = await Movies.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).send({
        isSuccess: true,
        data: resData,
        message: 'update in DB'
    });

};

const deleteMoviesAPI = async(req, res) => {
    const { id } = req.params;
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
        return res.status(400).send({
            isSuccess: false,
            message: 'Invalid Id',
        })
    } 
    const foundMoviesById = await Movies.findById(id);
if (!foundMoviesById) {
    return res.status(400).send({
        isSuccess: false,
        message: 'this id not found.',
    })
}

await Movies.findByIdAndDelete(id);
    return res.status(200).send({
        isSuccess: true,
        message: 'delete in DB'
    });

};

module.exports = {
    getMoviesAPI,
    getSingleMovieAPI,
    postMoviesAPI,
    patchMoviesAPI,
    deleteMoviesAPI
}