const GameService = require("../service/GameService")

class GameControler {
    getGame(req, res){
        try {
            const {gameId} = req.body
           GameService.getGame(gameId)
            .then((gameData) => res.status(200).json(gameData))
        } catch (error) {
            res.status(200).json(error)
        }
    }
}

module.exports = GameControler