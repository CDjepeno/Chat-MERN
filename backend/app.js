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
    ws.on('pseudo', (pseudo) => {
      console.log(`${pseudo} is connected`);
    });

    ws.on('message', ({pseudo, message}) => {
      console.log('received:', message, pseudo);
      io.emit('message', {message, pseudo});
    });
    
    ws.on('disconnect', () => {
      console.log('a user is disconnected');
    })
});


http.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})


