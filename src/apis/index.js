const route = require('express').Router();
const chatRoute = require('./chat')
const authRoute = require('./auth')
const courseRoute = require('./course');
const learningPathRoute = require('./learning path')
const roomRoute = require('./room')

route.use('/chat', chatRoute)
route.use('/course', courseRoute)
route.use('/auth', authRoute)
route.use('/learning-path', learningPathRoute)
route.use('/room', roomRoute)

module.exports = route;