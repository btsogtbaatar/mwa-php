const mongoose = require("mongoose");
const StatusCodes = require("http-status-codes").StatusCodes;

const errors = require("../error-handler/error");
const response = require("../util").response;

const Movies = mongoose.model("Movies");

function getAll(req, res, next) {
  let offset = parseInt(process.env.DEFAULT_OFFSET, 10);
  let count = parseInt(process.env.DEFAULT_COUNT, 10);
  let maxCount = parseInt(process.env.MAX_COUNT, 10);

  if (req.query?.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query?.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    next(errors.OffsetAndCountError);
    return;
  }

  if (count > maxCount) {
    next(errors.MaxCountExceededError);
    return;
  }

  Movies.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, movies) {
      if (err) {
        next(err);
        return;
      }

      response.success(movies, res);
    });
}

function getById(req, res, next) {
  let movieId = req.params.id;

  Movies.findById(movieId, function (err, movie) {
    if (err) {
      next(err);
      return;
    }

    if (movie == null) {
      next(errors.MovieNotFoundError);
      return;
    }

    response.success(movie, res);
  });
}

function create(req, res, next) {
  let movie = req.body;

  Movies.create(movie, function (err, createdMovie) {
    if (err) {
      next(err);
      return;
    }

    response.success(createdMovie, res, StatusCodes.CREATED);
  });
}

function update(req, res, next) {
  let movieId = req.params.id;

  const temp = {
    name: req.body.name,
    releasedYear: req.body.releasedYear,
    genre: req.body.genre,
  };

  const movie = new Movies(temp);

  const error = movie.validateSync();

  if (error) {
    next(error);
    return;
  }

  Movies.updateOne({ _id: movieId }, temp, function (err, update) {
    if (update.n === 0) {
      next(errors.MovieNotFoundError);
      return;
    }

    response.success({}, res);
  });
}

function patch(req, res, next) {
  let movieId = req.params.id;

  Movies.findById(movieId, function (err, _movie) {
    if (err) {
      next(err);
      return;
    }

    if (_movie) {
      const temp = {
        name: req.body?.name ? req.body.name : _movie.name,
        releasedYear: req.body?.releasedYear
          ? req.body.releasedYear
          : _movie.releasedYear,
        genre: req.body?.genre ? req.body.genre : _movie.genre,
      };

      const movie = new Movies(temp);

      const error = movie.validateSync();

      if (error) {
        next(error);
        return;
      }

      Movies.updateOne({ _id: movieId }, temp, function (err, update) {
        if (update.n === 0) {
          next(errors.MovieNotFoundError);
          return;
        }

        response.success({}, res);
      });
    }
  });
}

function remove(req, res, next) {
  let movieId = req.params.id;

  Movies.deleteOne({ _id: movieId }, function (err, remove) {
    if (err) {
      next(err);
      return;
    }

    if (remove.n === 0) {
      next(errors.MovieNotFoundError);
      return;
    }

    response.success({}, res);
  });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  patch,
  remove,
};
