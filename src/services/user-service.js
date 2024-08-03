const { JWT_KEY } = require("../config/serverConfig");
const { UserRepository } = require("../repository/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      addRole(user);
      return user;
    } catch (error) {
      console.log("Error in the service layer : " + error);
      throw error;
    }
  }

  async addRole(user)
  {
    try {
      const role = await this.userRepository.getRoleById(1);
      user.addRole(role);
      return user;
    } catch (error) {
      console.log("Error in addRole in the service layer : " + error);
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const user = await this.userRepository.getUserById(userId);
      return user;
    } catch (error) {
      console.log("Error in the service layer : " + error);
      throw error;
    }
  }

  #createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.log("Error while creating token : " + error);
      throw error;
    }
  }

  verifyToken(token) {
    try {
      var decoded = jwt.verify(token, JWT_KEY);
      return decoded;
    } catch (error) {
      console.log("Error while verifing the token : " + error);
      throw error;
    }
  }

  async signin(email, plainPassword) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      const passwordMatch = this.#checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("Password does not match");
        throw { error: "Incorrect password" };
      }

      const newJWT = this.#createToken({
        email: user.email,
        password: user.password,
      });

      return newJWT;
    } catch (error) {
      console.log("Error while siging in");
      throw error;
    }
  }

  #checkPassword(userInputPassword, encryptedPassword) {
    try {
      const result = bcrypt.compareSync(userInputPassword, encryptedPassword);
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error while checking password");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) throw { error: "Invalid token" };

      const user = await this.userRepository.getUserById(response.id);
      if (!user) {
        throw { error: "No user with given token exist" };
      }
    } catch (error) {
      console.log("Error in isAuthenticated in service ");
      throw error;
    }
  }
}

module.exports = UserService;
