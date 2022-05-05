const route = require('express').Router();
const userRoute = require('./users')

route.use('/user', userRoute)

module.exports = route;