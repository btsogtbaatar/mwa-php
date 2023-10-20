const mongoose = require("mongoose");

const constants = require("../constant");
const util = require("../util")

const { response } = require("../../util");
const constant = require("../constant");

const Movies = mongoose.model(constants.MOVIE_SCHEMA_NAME);

function getAll(req, res, next) {
  Movies.findById(req.params.id)
    .select(constant.CHARACTER_PATH_NAME).exec()
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => response.success(res, movie.characters))
    .catch(err => next(err))
}

function getOne(req, res, next) {
  Movies.findById(req.params.id)
    .select(constant.CHARACTER_PATH_NAME).exec()
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => util.checkIfCharacterExists(movie, req.params.characterId))
    .then(({ _, character }) => response.success(res, character))
    .catch(err => next(err))
}

function create(req, res, next) {
  Movies.findById(req.params.id)
    .select(constant.CHARACTER_PATH_NAME).exec()
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => util.addCharacterFromRequestBody(movie, req))
    .then(movie => movie.save())
    .then(savedMovie => response.success(res, savedMovie))
    .catch(err => next(err))
}

function _update(req, res, next, callBackFunction) {
  Movies.findById(req.params.id)
    .select(constant.CHARACTER_PATH_NAME).exec()
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => util.checkIfCharacterExists(movie, req.params.characterId))
    .then(({ movie, character }) => callBackFunction(movie, character, req))
    .then(({ movie, _ }) => movie.save())
    .then(savedMovie => response.success(res, savedMovie))
    .catch(err => next(err));
}

function fullUpdate(req, res, next) {
  _update(req, res, next, util.partialFillCharacterFromRequestBody);
}

function partialUpdate(req, res, next) {
  util.checkIfRequestBodyIsEmpty(req).then(req =>
    _update(req, res, next, util.partialFillCharacterFromRequestBody)
  ).catch(err => next(err));
}

function remove(req, res, next) {
  Movies.findById(req.params.id)
    .select(constant.CHARACTER_PATH_NAME).exec()
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => util.checkIfCharacterExists(movie, req.params.characterId))
    .then(({ movie, character }) => util.deleteCharacterFromMovie(movie, character))
    .then(movie => movie.save())
    .then(() => response.success(res, {}))
    .catch(err => next(err));
}

module.exports = {
  getAll,
  getOne,
  create,
  fullUpdate,
  partialUpdate,
  remove,
};
