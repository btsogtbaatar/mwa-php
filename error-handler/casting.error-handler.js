const StatusCodes = require("http-status-codes").StatusCodes;

const castingErrorHandler = function (err) {
  const status = StatusCodes.BAD_REQUEST;
  const message = err.reason.message;

  return {
    status,
    message,
  };
};

module.exports = castingErrorHandler;
