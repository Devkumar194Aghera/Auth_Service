const { JWT_KEY } = require("../config/serverConfig");
const { UserRepository } = require("../repository/index");
const jwt = require("jsonwebtoken");
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

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Error while creating token : " + error);
      throw error;
    }
  }

  verifyToken(token, user) {
    try {
      var decoded = jwt.verify(token, JWT_KEY);
      return decoded.email == user.email && decoded.id == user.id;
    } catch (error) {
      console.log("Error while verifing the token : " + error);
      throw error;
    }
  }
}

module.exports = UserService;
