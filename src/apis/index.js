const route = require('express').Router();
const chatRoute = require('./chat')
const authRoute = require('./auth')
const courseRoute = require('./course');
const learningPathRoute = require('./learning path')
const roomRoute = require('./room')
const userRoute = require('./user')

route.use('/chat', chatRoute)
route.use('/course', courseRoute)
route.use('/auth', authRoute)
route.use('/learning-path', learningPathRoute)
route.use('/room', roomRoute)
route.use('/user', userRoute);

module.exports = route;