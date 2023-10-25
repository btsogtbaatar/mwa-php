const constant = require("./constant");

function cors(req, res, next) {
  res.header(constant.CORS_ORIGIN_HEADER, process.env.CORS_ORIGIN);
  res.header(constant.CORS_METHODS_HEADER, process.env.CORS_METHODS);
  res.header(constant.CORS_HEADERS_HEADER, process.env.CORS_HEADERS);
  next();
}

module.exports = cors;
