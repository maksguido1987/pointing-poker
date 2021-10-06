const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = Schema({
  game_id: String,
  name: String,
  lastName: String,
  isDialer: Boolean,
  isObserver: Boolean,
  isPlayer: Boolean,
  job: String,
  avatar: String,
});

module.exports = mongoose.model('users', UserSchema);