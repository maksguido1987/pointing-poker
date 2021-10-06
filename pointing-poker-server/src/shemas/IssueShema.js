const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const IssueSchema = Schema({
  game_id: String,
  title: String,
  link: String,
  priority: String,
  isCurrent: Boolean,
  results: [{
    id: String,
    stats: Number,
    content: String,

  }]
});

module.exports = mongoose.model('issues', IssueSchema)