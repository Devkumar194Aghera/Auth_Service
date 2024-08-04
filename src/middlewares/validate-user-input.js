const { Validator } = require("sequelize");

function validateInputhAuth(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error: "email or password is missing",
    });
  }
  next();
}

function validateIsAdmin(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({
      data: {},
      success: false,
      error: "Something went wrong",
      message: "user id is missing",
    });
  }
  next();
}

module.exports = { validateInputhAuth, validateIsAdmin };
