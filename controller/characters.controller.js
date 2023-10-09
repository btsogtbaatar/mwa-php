const mongoose = require("mongoose");
const StatusCodes = require("http-status-codes").StatusCodes;

const Movies = mongoose.model("Movies");
const Characters = mongoose.model("Characters");

const errors = require("../error-handler/error");
const { moviesSchema } = require("../data/schemas");
const response = require("../util").response;

function getAll(req, res, next) {
  const movieId = req.params.id;

  Movies.findById(movieId)
    .select(moviesSchema.CHARACTER_PATH_NAME)
    .exec(function (err, movie) {
      if (err) {
        next(err);
        return;
      }

      if (movie === null) {
        next(errors.MovieNotFoundError);
        return;
      }

      response.success(movie.characters, res);
    });
}

function getById(req, res, next) {
  const movieId = req.params.id;
  const characterId = req.params.characterId;

  Movies.findById(movieId)
    .select(moviesSchema.CHARACTER_PATH_NAME)
    .exec(function (err, movie) {
      if (err) {
        next(err);
        return;
      }

      if (movie === null) {
        next(errors.MovieNotFoundError);
        return;
      }

      let character = movie.characters.id(characterId);

      if (character == null) {
        next(errors.CharacterNotFoundError);
        return;
      }

      response.success(movie.characters.id(characterId), res);
    });
}

function create(req, res, next) {
  const movieId = req.params.id;

  Movies.findById(movieId)
    .select(moviesSchema.CHARACTER_PATH_NAME)
    .exec(function (err, movie) {
      if (err) {
        next(err);
        return;
      }

      if (movie === null) {
        next(errors.MovieNotFoundError);
        return;
      }

      addCharacter(req, res, next, movie);
    });
}

function addCharacter(req, res, next, movie) {
  movie.characters.push({
    name: req.body.name,
    pictureUrl: req.body.pictureUrl,
    actorName: req.body.actorName,
    actorPictureUrl: req.body.actorPictureUrl,
  });

  movie.save(function (err, updatedMovie) {
    if (err) {
      next(err);
      return;
    }

    response.success(updatedMovie, res, StatusCodes.CREATED);
  });
}

function update(req, res, next) {
  const movieId = req.params.id;
  const characterId = req.params.characterId;

  Movies.findById(movieId)
    .select(moviesSchema.CHARACTER_PATH_NAME)
    .exec(function (err, movie) {
      if (err) {
        next(err);
        return;
      }

      if (movie === null) {
        next(errors.MovieNotFoundError);
        return;
      }

      updateCharacter(req, res, next, movie, characterId);
    });
}

function updateCharacter(req, res, next, movie, characterId) {
  let updatingCharacter = movie.characters.id(characterId);

  if (updatingCharacter === null) {
    next(errors.CharacterNotFoundError);
    return;
  }

  const temp = {
    name: req.body.name,
    actorName: req.body.actorName,
    pictureUrl: req.body.pictureUrl,
    actorPictureUrl: req.body.actorPictureUrl,
  };

  const character = new Characters(temp);

  const error = character.validateSync();

  if (error) {
    next(error);
    return;
  }

  updatingCharacter.name = temp.name;
  updatingCharacter.actorName = temp.actorName;
  updatingCharacter.pictureUrl = temp.pictureUrl;
  updatingCharacter.actorPictureUrl = temp.actorPictureUrl;

  movie.save(function (err, updatedMovie) {
    if (err) {
      next(err);
      return;
    }

    response.success(updatedMovie, res);
  });
}

function patch(req, res, next) {
  const movieId = req.params.id;
  const characterId = req.params.characterId;

  Movies.findById(movieId)
    .select(moviesSchema.CHARACTER_PATH_NAME)
    .exec(function (err, movie) {
      if (err) {
        next(err);
        return;
      }

      if (movie === null) {
        next(errors.MovieNotFoundError);
        return;
      }

      patchCharacter(req, res, next, movie, characterId);
    });
}

function patchCharacter(req, res, next, movie, characterId) {
  let updatingCharacter = movie.characters.id(characterId);

  if (updatingCharacter === null) {
    next(errors.CharacterNotFoundError);
    return;
  }

  const temp = {
    name: req.body.name ? req.body.name : updatingCharacter.name,
    actorName: req.body.actorName
      ? req.body.actorName
      : updatingCharacter.actorName,
    pictureUrl: req.body.pictureUrl
      ? req.body.pictureUrl
      : updatingCharacter.pictureUrl,
    actorPictureUrl: req.body.actorPictureUrl
      ? req.body.actorPictureUrl
      : updatingCharacter.actorPictureUrl,
  };

  const character = new Characters(temp);

  const error = character.validateSync();

  if (error) {
    next(error);
    return;
  }

  updatingCharacter.name = temp.name;
  updatingCharacter.actorName = temp.actorName;
  updatingCharacter.pictureUrl = temp.pictureUrl;
  updatingCharacter.actorPictureUrl = temp.actorPictureUrl;

  movie.save(function (err, updatedMovie) {
    if (err) {
      next(err);
      return;
    }

    response.success(updatedMovie, res);
  });
}

function remove(req, res, next) {
  const movieId = req.params.id;
  const characterId = req.params.characterId;

  Movies.findById(movieId)
    .select(moviesSchema.CHARACTER_PATH_NAME)
    .exec(function (err, movie) {
      if (err) {
        next(err);
        return;
      }

      if (movie === null) {
        next(errors.MovieNotFoundError);
        return;
      }

      deleteCharacter(req, res, next, movie, characterId);
    });
}

function deleteCharacter(req, res, next, movie, characterId) {
  const index = movie.characters.findIndex(function (value) {
    return value._id == characterId;
  });

  if (index == -1) {
    next(errors.CharacterNotFoundError);
    return;
  }

  movie.characters.splice(index, 1);

  movie.save(function (err, updatedMovie) {
    if (err) {
      next(err);
      return;
    }

    response.success(updatedMovie, res);
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
