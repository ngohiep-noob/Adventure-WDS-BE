const route = require('express').Router()
const authController = require('./auth.controller')
const { VerifyToken } = require('../../middleware/Authorization')

route.post('/login', authController.Login)

route.post('/register', authController.Register)

route.post('/logout', VerifyToken, authController.Logout)

route.get('/token', VerifyToken, authController.GetToken)

module.exports = route;