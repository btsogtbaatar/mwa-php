const { response } = require("../util");
const validationErrorHandler = require("./validation.error-handler");
const castErrorHandler = require("./cast.error-handler");
const errors = require("./errors");
const constant = require("../constant");

const errorHandling = function (err, req, res, next) {
  console.info(req.url, req.method);
  console.error("Error:", err);

  let error = errors.INTERNAL_SERVER_ERROR

  switch (err.name) {
    case constant.VALIDATION_ERROR_NAME:
      error = validationErrorHandler(err);
      break;
    case constant.CUSTOM_ERROR_NAME:
      error = err;
      break;
    case constant.CAST_ERROR_NAME:
      error = castErrorHandler(err);
      break;
    default:
      break;
  }

  response.error(res, error);
  next();
};

module.exports = {
  errorHandling,
  errors
};
