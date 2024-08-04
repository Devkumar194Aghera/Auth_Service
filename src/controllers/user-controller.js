const { UserService } = require("../services/index");
const userService = new UserService();

const create = async (req, res) => {
  try {
    const data = req.body;
    const user = await userService.createUser({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: user,
      success: true,
      message: "Successfully created a user",
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      error: error.explanation,
    });
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUser(id);
    return res.status(200).json({
      data: user,
      success: true,
      message: "Successfully fetch a user",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while fetching a user",
      error: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const data = req.body;
    const token = await userService.signin(data.email, data.password);
    return res.status(200).json({
      data: token,
      success: true,
      message: "Successfully sigin",
      error: {},
    });
  } catch (error) {
      return res.status(error.statusCode).json({
        data: {},
        success: false,
        message: error.message,
        error: error.explanation,
      });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const result = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: true,
      success: true,
      message: "User is authenticated and token iss valid",
      error: {},
    });
  } catch (error) {
    return res.status(401).json({
      data: {},
      success: false,
      message: "User is not authenticated",
      error: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const result = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: result,
      success: true,
      message: "Successfully verified that the given user is admin",
      error: {},
    });
  } catch (error) {
    return res.status(401).json({
      data: {},
      success: false,
      message: "User is not authenticated",
      error: error,
    });
  }
};

module.exports = { create, get, signIn, isAuthenticated, isAdmin };
