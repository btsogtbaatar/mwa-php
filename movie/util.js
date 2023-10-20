const mongoose = require("mongoose");
const constant = require("./constant")

const { errors } = require("../error-handler");
const Characters = mongoose.model(constant.CHARACTER_SCHEMA_NAME);

function checkIfMovieIsNull(movie) {
    return new Promise((resolve, reject) => {
        if (null == movie) {
            reject(errors.MOVIE_NOT_FOUND);
        } else {
            resolve(movie)
        }
    })
}

function deleteCharacterFromMovie(movie, character) {
    character.deleteOne();
    return Promise.resolve(movie);
}

function checkIfCharacterExists(movie, characterId) {
    return new Promise((resolve, reject) => {
        const character = movie.characters.id(characterId)

        if (null == character) {
            reject(errors.CHARACTER_NOT_FOUND);
        } else {
            resolve({ movie, character })
        }
    })
}

function checkIfRequestBodyIsEmpty(req) {
    return new Promise((resolve, reject) => {
        if (Object.keys(req.body).length > 0) {
            resolve(req)
        } else {
            reject(errors.REQUEST_BODY_EMPTY)
        }
    })
}

function checkIfMovieIsDeleted(result) {
    return new Promise((resolve, reject) => {
        if (result.n != 0) {
            resolve(result)
        } else {
            reject(errors.MOVIE_NOT_FOUND)
        }
    })
}

function addCharacterFromRequestBody(movie, req) {
    let _character = {
        name: req.body.name,
        pictureUrl: req.body.pictureUrl,
        actorName: req.body.actorName,
        actorPictureUrl: req.body.actorPictureUrl,
    };

    movie.characters.push(new Characters(_character));

    return Promise.resolve(movie)
}

function populateMovieFromRequestBody(req) {
    let _movie = {
        name: req.body.name,
        releasedYear: req.body.releasedYear,
        genre: req.body.genre,
    }

    return _movie;
}

function fullFillCharacterFromRequestBody(movie, character, req) {
    character.name = req.body.name;
    character.actorName = req.body.actorName;
    character.pictureUrl = req.body.pictureUrl;
    character.actorPictureUrl = req.body.actorPictureUrl;

    return Promise.resolve({ movie, character });
}

function partialFillCharacterFromRequestBody(movie, character, req) {
    if (req.body.name) {
        character.name = req.body.name;
    }
    if (req.body.actorName) {
        character.actorName = req.body.actorName;
    }

    if (req.body.pictureUrl) {
        character.pictureUrl = req.body.pictureUrl;
    }

    if (req.body.actorPictureUrl) {
        character.actorPictureUrl = req.body.actorPictureUrl;
    }

    return Promise.resolve({ movie, character });
}

function fullFillMovieFromRequestBody(movie, req) {
    movie.name = req.body.name;
    movie.releasedYear = req.body.releasedYear;
    movie.genre = req.body.genre;

    return Promise.resolve(movie);
}

function partialFillMovieFromRequestBody(movie, req) {
    if (req.body.name) {
        movie.name = req.body.name;
    }
    if (req.body.releasedYear) {
        movie.releasedYear = req.body.releasedYear;
    }

    if (req.body.genre) {
        movie.genre = req.body.genre;
    }

    if (req.body.characters) {
        movie.characters = req.body.characters;
    }

    return Promise.resolve(movie);
}

function getNumberValue(value, defaultValue) {
    return value ? parseInt(value, 10) : defaultValue;
}

module.exports = {
    checkIfMovieIsNull,
    checkIfCharacterExists,
    addCharacterFromRequestBody,
    checkIfRequestBodyIsEmpty,
    fullFillCharacterFromRequestBody,
    partialFillCharacterFromRequestBody,
    getNumberValue,
    populateMovieFromRequestBody,
    fullFillMovieFromRequestBody,
    partialFillMovieFromRequestBody,
    checkIfMovieIsDeleted,
    deleteCharacterFromMovie
}

