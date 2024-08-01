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
    return res.status(500).json({
      data: {},
      success: false,
      message: "Error while creating a user",
      error: error,
    });
  }
};

module.exports = { create };
