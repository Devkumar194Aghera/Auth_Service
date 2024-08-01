const { UserRepository } = require("../repository/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("Error in the service layer : " + error);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (error) {
      console.log("Error in the service layer : " + error);
      throw error;
    }
  }
}

module.exports = UserService;
