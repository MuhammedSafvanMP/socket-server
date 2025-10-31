const express = require("express");
const http = require("http");
const sokcetIo = require("socket.io");
const cors = require("cors");

const app = express();


const server = http.createServer(app);
const io =  sokcetIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors("*"));


app.use(express.json());


app.post('/send', (req, res) => {
    const message = req.body.message
    console.log(message);

    io.emit('pushNotification', {
        message
    });

    res.status(200).send({ message: "Sent Successfully" })
    
    io.on('connection', (socket) => {
        console.log('Connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            
        })
        
    })
});


server.listen(3000, () => {
    console.log("Server is running on 3000");
    
})