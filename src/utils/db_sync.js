const db = require("../models/index");

function db_SYNC() {
  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
}

module.exports = db_SYNC;
