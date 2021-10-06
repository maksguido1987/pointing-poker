const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GameSchema = Schema({
    title: String,
    users: [{
        type: String
    }],
    issues: [{
        type: String
    }]
});

module.exports = mongoose.model('game', GameSchema)