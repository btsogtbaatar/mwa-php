const mongoose = require("mongoose");

const constant = require("../constant");

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

mongoose.model(constant.CHARACTER_SCHEMA_NAME, charactersSchema, process.env.CHARACTER_COLLECTION_NAME);

module.exports = charactersSchema;
