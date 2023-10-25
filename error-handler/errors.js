const { StatusCodes } = require("http-status-codes");
const constant = require("../constant");

module.exports = {
  INTERNAL_SERVER_ERROR: {
    name: constant.CUSTOM_ERROR_NAME,
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      message: "Internal server error."
    }
  },
  MOVIE_NOT_FOUND: {
    name: constant.CUSTOM_ERROR_NAME,
    status: StatusCodes.NOT_FOUND,
    body: {
      message: "Movie is not found.",
    }
  },
  INVALID_OFFSET_AND_COUNT: {
    name: constant.CUSTOM_ERROR_NAME,
    status: StatusCodes.BAD_REQUEST,
    body: {
      message: "Offset and count should be numbers.",
    }
  },
  CHARACTER_NOT_FOUND: {
    name: constant.CUSTOM_ERROR_NAME,
    status: StatusCodes.NOT_FOUND,
    body: {
      message: "Character is not found.",
    }
  },
  MAX_COUNT_EXCEEDED: {
    name: constant.CUSTOM_ERROR_NAME,
    status: StatusCodes.BAD_REQUEST,
    body: {
      message: "Max count exceeded.",
      details: {
        count: `It should not be greater than ${process.env.MAX_COUNT}`
      }
    }
  },
  REQUEST_BODY_EMPTY: {
    name: constant.CUSTOM_ERROR_NAME,
    status: StatusCodes.BAD_REQUEST,
    body: {
      message: "Request body is empty."
    }
  }
};
