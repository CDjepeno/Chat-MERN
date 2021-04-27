const dotenv = require('dotenv')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {cors: {origin:'*', methods: ["GET", "POST"]}})
const PORT = process.env.PORT || 8000
dotenv.config()


app
.use(express.json())


io.on('connection', ws => {
    // console.log('A new client connected');
    ws.on('pseudo', (pseudo) => {
      console.log(`${pseudo} is connected`);
    });

    ws.on('message', ({pseudo, message}) => {
      console.log('received:', message, pseudo);
      io.emit('message', {pseudo, message});
    });
    
    ws.on('disconnect', () => {
      console.log('a user is disconnected');
    })
});


http.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})


