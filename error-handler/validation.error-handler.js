const { StatusCodes } = require("http-status-codes");

const validationErrorHandler = function (err) {
  let details = {};

  for (const key in err.errors) {
    details[key] = err.errors[key].message;
  }

  return {
    status: StatusCodes.BAD_REQUEST,
    body: {
      message: err._message,
      details,
    }
  };
};

module.exports = validationErrorHandler;
