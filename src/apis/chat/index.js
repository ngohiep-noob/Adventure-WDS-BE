const route = require('express').Router()
const path = require('path')
const io = require('../../../index.js')

route.get('/', (req, res) => {
    //send chat form
    res.sendFile(path.join(__dirname, "../../../public/index.html"))
})

module.exports = route;