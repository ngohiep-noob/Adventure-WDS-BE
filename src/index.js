require('dotenv').config();
const express = require('express')
const app = express();
const morgan = require('morgan')
const connectDatabase = require('./config/database.config')
const cors = require('cors')
const createError = require('http-errors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use("/api",require('./apis/index'))

connectDatabase();

app.use((req, res, next) => {
    next(new createError(404, 'NOT FOUND'));
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;
    console.log(error.message)
    res.status(statusCode).json({
        statusCode,
        message,
    });
});

app.listen(process.env.PORT || 5000, async() => {
    console.log("Server is running on port ", process.env.PORT);
})

