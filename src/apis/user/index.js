const route = require('express').Router()
const userController = require('./user.controller')

route.post('/enroll', userController.EnrollCourse);

route.post('/join-room/:id', userController.JoinRoom);

route.post('/create-room', userController.CreateRoom);

module.exports = route;