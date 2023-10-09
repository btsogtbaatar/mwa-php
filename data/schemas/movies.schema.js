const mongoose = require("mongoose");
const charactersSchema = require("./characters.schema");

const Genre = {
  Comedy: "comedy",
  Thriller: "thriller",
  Horror: "horror",
  Action: "action",
  SciFi: "sci-fi",
  Romance: "romance",
  Adventure: "adventure"
};

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
    enum: Genre,
    required: true,
  },
  characters: {
    type: [charactersSchema],
    required: false,
  },
});

mongoose.model("Movies", moviesSchema, "movies");

module.exports = {
  CHARACTER_PATH_NAME: "characters",
};
