const mongoose = require("mongoose");
const charactersSchema = require("./character.model");
const constant = require("../constant");

const moviesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releasedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    enum: constant.GENRES,
    required: true,
    validate: {
      validator: function (array) {
        return array && array.length > 0;
      },
      message: () => constant.GENRE_REQUIRED_MESSAGE
    }
  },
  characters: {
    type: [charactersSchema],
    required: false,
  },
});

mongoose.model(constant.MOVIE_SCHEMA_NAME, moviesSchema, process.env.MOVIE_COLLECTION_NAME);