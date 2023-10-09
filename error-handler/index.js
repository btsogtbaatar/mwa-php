const StatusCodes = require("http-status-codes").StatusCodes;
const response = require("../util").response;
const customErrorErrorHandler = require("./custom.error-handler");
const validationErrorHandler = require("./validation.error-handler");
const castingErrorHandler = require("./casting.error-handler");

const errorHandling = function (err, req, res, next) {
  console.error(req.url, req.method);
  console.error(err);

  let error = {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error.",
    details: {},
  };

  switch (err.name) {
    case "ValidationError":
      error = validationErrorHandler(err);
      break;
    case "CustomError":
      error = customErrorErrorHandler(err);
      break;
    case "CastError":
      error = castingErrorHandler(err);
      break;
    default:
      break;
  }

  response.error(error, res);
};

module.exports = errorHandling;
