const mongoose = require("mongoose");

const { errors } = require("../../error-handler");
const { response } = require("../../util");

const util = require("../util")
const constant = require("../constant");

const Movies = mongoose.model(constant.MOVIE_SCHEMA_NAME);
function getAll(req, res, next) {
  const offset = util.getNumberValue(req.query.offset, process.env.DEFAULT_OFFSET);
  const count = util.getNumberValue(req.query.offset, process.env.DEFAULT_COUNT);

  if (isNaN(offset) || isNaN(count)) {
    return next(errors.INVALID_OFFSET_AND_COUNT);
  }

  if (count > process.env.MAX_COUNT) {
    return next(errors.MAX_COUNT_EXCEEDED);
  }

  Movies.find().skip(offset).limit(count).exec()
    .then(movies => response.success(res, movies))
    .catch(err => next(err));
}

function getOne(req, res, next) {
  Movies.findById(req.params.id)
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => response.success(res, movie))
    .catch(err => next(err));
}

function create(req, res, next) {
  Movies.create(util.populateMovieFromRequestBody(req))
    .then(createdMovie => response.success(res, createdMovie))
    .catch(err => next(err));
}

function _updateOne(req, res, next, callBackFunction) {

  Movies.findById(req.params.id)
    .then(movie => util.checkIfMovieIsNull(movie))
    .then(movie => callBackFunction(movie, req))
    .then(movie => movie.save())
    .then(savedMovie => response.success(res, savedMovie))
    .catch(err => next(err));
}

function partialUpdate(req, res, next) {
  util.checkIfRequestBodyIsEmpty(req).then(req =>
    _updateOne(req, res, next, util.partialFillMovieFromRequestBody)
  ).catch(err => next(err));
}

function fullUpdate(req, res, next) {
  _updateOne(req, res, next, util.fullFillMovieFromRequestBody);
}

function remove(req, res, next) {
  let movieId = req.params.id;

  Movies.deleteOne({ _id: movieId })
    .then(result => util.checkIfMovieIsDeleted(result))
    .then(_ => response.success(res, {}))
    .catch(err => next(err));
}

module.exports = {
  getAll,
  getOne,
  create,
  partialUpdate,
  fullUpdate,
  remove,
};
