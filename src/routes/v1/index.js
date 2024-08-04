const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller");
const { validateInputhAuth } = require("../../middlewares/index");

router.post(
  "/signup",
  validateInputhAuth.validateInputhAuth,
  UserController.create
);
router.get("/signup/:id", UserController.get);
router.post(
  "/signin",
  validateInputhAuth.validateInputhAuth,
  UserController.signIn
);

router.get("/isAuthenticated", UserController.isAuthenticated);

router.get(
  "/isAdmin",
  validateInputhAuth.validateIsAdmin,
  UserController.isAdmin
);

module.exports = router;
