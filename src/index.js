const express = require("express");
const { PORT } = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const { UserService } = require("./services/index");

function configureAndStartServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
    const userService = new UserService();
    const user = {
      email: "devaghera194@gmail.com",
      id: "1",
    };
    // const token = userService.createToken();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldmFnaGVyYTE5NEBnbWFpbC5jb20iLCJpZCI6IjEiLCJpYXQiOjE3MjI1MjIzMDksImV4cCI6MTcyMjUyNTkwOX0.pZK6JmzUfwaTA-t9chzCS2pxH1n3YSDrPZN-Zh-xMdw";
    const result = userService.verifyToken(token, user);
    console.log(result);
  });
}
configureAndStartServer();
