const mongoose = require('mongoose');
const { route } = require('./router/router');
const { json } = require('body-parser');
const express = require('express');
const cors = require('cors');
const http = require('http');
const MsgController = require('./controllers/MsgController');
const GameService = require('./service/GameService');
const UserService = require('./service/UserService');

const PORT = Number(process.env.PORT) || 7001;
const DB_URL =
    'mongodb+srv://user1:user1@clusterfornodejs.71bfz.mongodb.net/poining_poker?retryWrites=true&w=majority';

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '5mb' }));
app.use(cors({
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}))
app.use(
    express.urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 })
);
app.use(json());
app.use('/api', route);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:8080',
    },
});

app.post('/api/start', (req, res) => {
    const { gameIndex } = req.body
    GameService.setNewGame(gameIndex)
        .then((newGame) => { res.send(newGame) })
})


try {
    io.on('connection', (socket) => {
        socket.on('join-game', async (roomId, user) => {
            socket.join(roomId)
            const users = await UserService.getAllUsers(roomId)
            const game = await GameService.getGame(roomId)
            io.to(socket.id).emit('get-prev-data', users, game.title)
            socket.to(roomId).emit('joined', user)
        })
        socket.on('set-title', (id, title) => {
            io.in(id).emit('received-title', title)
        })
        const msgController = new MsgController(io, socket)
        socket.on('send-msg', (msg) => {
            console.log('msg sent', msg)
            io.in(msg.game_id).emit('recieve-msg', msg)
            msgController.setMessage(msg)
        })
        socket.on('deleted-user', (userID, id) => {
            io.in(id).emit('received-deleted-user', userID)
        })
        socket.on('game-settings', (settings, id) => {
            io.in(id).emit('received-settings', settings)
        })
        socket.on('set-timer', (time, id) => {
            io.in(id).emit('received-timer', time)
        })
        socket.on('set-issues', (issues, id) => {
            io.in(id).emit('received-issues', issues)
        })
        socket.on('set-deleted-issues', (issueID, id) => {
            io.in(id).emit('received-deleted-issues', issueID)
        })
        socket.on('send-rename-issues', (data, issueID, id) => {
            io.in(id).emit('received-rename-issues', data, issueID)
        })
        socket.on('relocate-result-page', (id) => {
            io.in(id).emit('received-relocate-result-page')
        })
        socket.on('round', (id) => {
            io.in(id).emit('received-round')
        })
        socket.on('restart-round', (issueCards, timer, id) => {
            io.in(id).emit('received-restart-round', issueCards, timer)
        })
        socket.on('next-issue', (CardsArr, issueCards, elemIndex, id) => {
            io.in(id).emit('received-next-issue', CardsArr, issueCards, elemIndex)
        })
        socket.on('results', (CardsArr, issueCards, elemIndex, id) => {
            io.in(id).emit('received-results', CardsArr, issueCards, elemIndex)
        })
        socket.on('card', (cardID, id) => {
            io.in(id).emit('received-card', cardID)
        })
        socket.on('card-deleted', (cardID, id) => {
            io.in(id).emit('received-card-deleted', cardID)
        })
        socket.on('is-user-selected-card', (userID, id) => {
            io.in(id).emit('received-is-user-selected-card', userID)
        })
        socket.on('is-user-canceled-card', (userID, id) => {
            io.in(id).emit('received-is-user-canceled-card', userID)
        })
        socket.on('cancel-game', (id) => {
            io.in(id).emit('received-cancel-game')
        })
        socket.on('delete-form', (who, whom, userID, id) => {
            io.in(id).emit('received-delete-form', who, whom, userID)
        })
        socket.on('delete-choice', (id) => {
            io.in(id).emit('received-delete-choice')
        })
        socket.on('is-observer', (count, id) => {
            io.in(id).emit('received-is-observer', count)
        })
    })
} catch (error) {
    console.log(error);
}

try {
    server.listen(PORT, async () => {
        console.log(`server is started on ${PORT}`);
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        });
    });
} catch (error) {
    console.log(error);
}
