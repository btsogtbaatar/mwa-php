const mongoose = require("mongoose");

const charactersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  actorName: {
    type: String,
    required: true,
  },
  actorPictureUrl: {
    type: String,
    required: true,
  },
});

mongoose.model("Characters", charactersSchema, "characters");

module.exports = charactersSchema;
