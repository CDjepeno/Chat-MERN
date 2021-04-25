import express from 'express'
import dotenv from 'dotenv'
import WebSocket from 'ws'
dotenv.config()


const app = express()

app
.use(express.json())

export const PORT = process.env.PORT || 8000

const wss = new WebSocket.Server({ port: 8002 })

wss.on('connection', function connection(ws) {
    console.log('A new client connected');
    ws.send('Welcome new client');

    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      ws.emit('Got ur msg its: ' + message);
    });
    
});


app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
})


