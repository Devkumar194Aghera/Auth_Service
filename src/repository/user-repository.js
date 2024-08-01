const { where } = require("sequelize");
const { User } = require("../models/index");

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
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
}

module.exports = UserRepository;
