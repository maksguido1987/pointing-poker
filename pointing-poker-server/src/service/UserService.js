const UserDB = require('../shemas/UserShema');

class UserService {
  async setUser(userInfo) {
    const newUser = await UserDB.create(userInfo);
    return newUser;
  }

  async getUser(userId) {
    if (!userId) {
      throw new Error('no ID');
    }
    const user = await UserDB.findById(userId);
    return user;
  }

  async getAllUsers(gameId) {
    const users = await UserDB.find({ game_id: gameId });
    return users;
  }

  async deleteUser(userId) {
    if (!userId) {
      throw new Error('no ID');
    }
    const deletedUser = await UserDB.findByIdAndDelete(userId);
    return deletedUser
  }
}

module.exports = new UserService();
