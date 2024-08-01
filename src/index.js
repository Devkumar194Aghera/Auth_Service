const express = require("express");
const { PORT } = require("./config/serverConfig");

function configureAndStartServer() {
  const app = express();
  app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
  });
}
configureAndStartServer();
