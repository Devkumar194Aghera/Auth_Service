const express = require("express");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

function configureAndStartServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
  });
}
configureAndStartServer();
