class CustomError {
  constructor(status, message, details) {
    this.name = "CustomError";
    this.message = message;
    this.status = status;
    this.details = details
  }
}

module.exports = {
  CustomError,
};
