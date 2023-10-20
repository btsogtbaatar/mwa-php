const StatusCodes = require("http-status-codes").StatusCodes;
function success(res, body, status = StatusCodes.OK) {
  res.status(status).json(body);
}

function error(res, error) {
  res.status(error.status).json(error.body);
}

module.exports = {
  success,
  error,
};
