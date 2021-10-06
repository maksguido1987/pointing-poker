const ChatService = require( "../service/ChatService")

class MsgController {
    constructor(io, scoket){
        this.io = io
        this.scoket = scoket
    }

    async setMessage(msg){
        try {
            await ChatService.addMessage(msg)
            
        } catch (error) {
            console.log(error)
        }
    }

    async getMessage(msgOrderId){
            const msg = await ChatService.getMessage(msgOrderId)
            return msg
    }

    async getAllMessages(req, res){
        try {
            const {gameId} = req.params
            const msgs = await ChatService.getAllMessages(gameId)
            return res.status(200).json(msgs)    
        } catch (error) {
            console.log('error', error)
            console.log('request', req.params)
            res.status(500).json(error)
        }
        
    }

    async deleteMessage(req, res){
        try {
           const {msgId} = req.params
           const result= await  ChatService.deleteMessage(msgId)
           return res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = MsgController