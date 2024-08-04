const ValidationError = require("../utils/validate-error");
const { User, Role } = require("../models/index");

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
        const validateError = new ValidationError(error);
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
      if (!user) throw "No user with this email address is present";
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
