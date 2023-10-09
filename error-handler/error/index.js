const { CustomError } = require("./CustomError");
const StatusCodes = require("http-status-codes").StatusCodes;

const errors = {
  MovieNotFoundError: new CustomError(
    StatusCodes.NOT_FOUND,
    "Movie is not found.",
    {}
  ),
  OffsetAndCountError: new CustomError(
    StatusCodes.BAD_REQUEST,
    "Offset and count should be numbers.",
    {}
  ),
  CharacterNotFoundError: new CustomError(
    StatusCodes.NOT_FOUND,
    "Character is not found.",
    {}
  ),
  MaxCountExceededError: new CustomError(
    StatusCodes.NOT_FOUND,
    "Max count exceeded.",
    { count: `It should not be greater than ${process.env.MAX_COUNT}` }
  ),
};

module.exports = errors;
