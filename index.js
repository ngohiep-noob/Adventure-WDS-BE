require('dotenv').config();
const express = require('express')
const app = express();
const morgan = require('morgan')
const connectDatabase = require('./src/config/database.config')
const cors = require('cors')
const path = require('path')
const createError = require('http-errors')
const {Server} = require('socket.io')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
connectDatabase();

app.use("/api",require('./src/apis/index'))

app.get('/test', (req, res, next) => {
    return res.json({Respose: "🚀🚀🚀🚀"})
});

const http = require('http')
const server = http.createServer(app);
const io = new Server(server);

//realtime chatting
io.on("connection", (socket) => {
    socket.on('on-chat', (data) => {
        io.emit('user-message', data)
    })
})

// app.use((req, res, next) => {
//     next(new createError(404, 'NOT FOUND'));
// });

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;
    console.log(error)

    res.status(statusCode).json({
        statusCode,
        message,
    });
});

const PORT = process.env.PORT || 3000

server.listen(PORT, async() => {
    console.log("Server is running on port ", PORT);
})


