const route = require('express').Router();
const Middleware = require('../middleware')
const userController = require('./user.controller')

//first login + save user to database
route.post('/', Middleware.DecodeToken,userController.StoreUserInfo);

module.exports = route;