const AppErrors = require("./error-codes");
const { StatusCodes } = require("http-status-codes");
class ClientError extends AppErrors {
  constructor(name, message, explanation, errorCode) {
    super(name, message, explanation, errorCode);
  }
}

module.exports = ClientError;
