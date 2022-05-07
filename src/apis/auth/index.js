const route = require('express').Router()
const authController = require('./auth.controller')

route.post('/login', authController.Login)

route.post('/register', authController.Register)

route.post('/logout', authController.Logout)

module.exports = route;