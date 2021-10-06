const GameDB = require('../shemas/GameShema')

class GameService {
   async setNewGame(gameTitle) {
      const newGame = await GameDB.create({ title: gameTitle })
      return newGame
   }

   async getGame(game_id) {
      const game = await GameDB.findById(game_id)
      return game
   }

   async updateGameUsers(gameId, userId) {
      const updateGame = await GameDB.updateOne(
         { _id: gameId },
         { $push: { users: userId } }
      );
      return updateGame
   }

}

module.exports = new GameService()