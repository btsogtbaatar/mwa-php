const StatusCodes = require("http-status-codes").StatusCodes;
function success(message, res, status = StatusCodes.OK) {
  res.status(status).json(message);
}

function error(error, res) {
  res.status(error.status).json({
    message: error.message,
    details: error.details,
  });
}

module.exports = {
  success,
  error,
};
