const express = require("express");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const db_SYNC = require("./utils/db_sync");

const { UserService } = require("./services/index");
const { UserRepository } = require("./repository/index");
function configureAndStartServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(ApiRoutes);

  app.listen(PORT, async () => {
    const userRepository = new UserRepository();

    console.log(`Server started on port : ${PORT}`);
    // db_SYNC();
  });
}
configureAndStartServer();
