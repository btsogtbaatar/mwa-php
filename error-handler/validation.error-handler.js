const StatusCodes = require("http-status-codes").StatusCodes;

const validationErrorHandler = function (err) {
  const status = StatusCodes.BAD_REQUEST;
  const message = err._message;
  const details = {};

  for (const key in err.errors) {
    details[key] = err.errors[key].message;
  }

  return {
    status,
    message,
    details,
  };
};

module.exports = validationErrorHandler;
