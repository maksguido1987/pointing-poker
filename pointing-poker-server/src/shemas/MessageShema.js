const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsgSchema = Schema({
  user_id: String,
  game_id: String,
  text: String,
  time: String
});

module.exports = mongoose.model('messages', MsgSchema)