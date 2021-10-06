const MessageDB = require('../shemas/MessageShema')

class ChatService {

    async addMessage(msg){
      await MessageDB.create(msg)
    }

    async getMessage(msgOrderId){
        if(!msgOrderId){
            throw new Error('no message ID')
        }
        const msg = await MessageDB.findById(msgOrderId)
        return msg
    }

    async getAllMessages(gameId){
            const msgs = await MessageDB.find({game_id: gameId})
            return  msgs           
    }   
    
    
    async deleteMessage(msgId){
        if(!msgId){
            throw new Error('no ID')
        }
        const delMsg = await MessageDB.findByIdAndDelete(msgId)
        return delMsg
    }
}

module.exports = new ChatService()