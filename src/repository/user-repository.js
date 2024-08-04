const ValidateError = require("../utils/validate-error");
const { User, Role } = require("../models/index");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create({
        email: data.email,
        password: data.password,
      });
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidateError(error);
      }
      console.log("Error in the repository layer :" + error);
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["id", "email"],
      });
      return user;
    } catch (error) {
      console.log("Error in the repository layer :" + error);
      throw error;
    }
  }

  async getUserByEmail(Email) {
    try {
      const user = await User.findOne({
        where: { email: Email },
      });
      if (!user)
        throw new ClientError(
          "AttributeNotFound",
          "Invalid email sent in the request",
          "Please check the email you entered",
          StatusCodes.NOT_FOUND
        );
      return user;
    } catch (error) {
      console.log("Error in the repository layer :" + error);
      throw error;
    }
  }

  async getRoleById(roleID) {
    try {
      const role = await Role.findByPk(roleID);
      return role;
    } catch (error) {
      console.log("Error in the repository layer :" + error);
      throw error;
    }
  }

  async destroyUser(userId) {
    try {
      const user = await User.destroy({ where: { id: userId } });
      return user;
    } catch (error) {
      console.log("Error in the repository layer :" + error);
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const role = await Role.findOne({ where: { name: "ADMIN" } });
      const user = await User.findByPk(userId);
      return user.hasRole(role);
    } catch (error) {
      console.log("Error in the repository layer :" + error);
      throw error;
    }
  }
}

module.exports = UserRepository;
