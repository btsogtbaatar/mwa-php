const { StatusCodes } = require("http-status-codes");

const castErrorHandler = function (err) {
  return {
    status: StatusCodes.BAD_REQUEST,
    body: { message: err.reason.message },
  };
};

module.exports = castErrorHandler;
