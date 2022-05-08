const route = require('express').Router()
const createHttpError = require('http-errors')
const path = require('path')
const { VerifyToken } = require('../../middleware/Authorization')
const chat = require('../../model/chat')
const Room = require('../../model/room')

route.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../../public/index.html"))
})

//get history chat
route.get('/:roomId', VerifyToken, async(req, res, next) => {
    try {
        const {userId} = req.userInfo;
        const {roomId} = req.params;
        const LIMIT = 50;
        //fetch chat from database
        const room = await Room.findById(roomId);

        //check if user are in room
        if(!room.members.includes(userId) && room.creator != userId) {
            throw new createHttpError(401, "User doesn't includes in room!");
        }

        await room.populate('chat')

        await Promise.all(room.chat.map(chat => {
            return chat.populate('sender', 'username')
        }))

        let historyChat = room.chat.map(c => {
            return {
                content: c.content,
                senderName: c.sender.username
            }
        })
    
        if(historyChat.length > LIMIT) {
            historyChat = historyChat.slice(0, LIMIT);
        }
        console.log(historyChat)

        res.json({
            chatHistory: historyChat
        })
        // res.sendFile(path.join(__dirname, "../../../public/index.html"))
        
    } catch (error) {
        next(error)
    }
})


route.delete('/clear', VerifyToken,async(req, res, next) => {
    try {
        const room = await Room.findById(req.params.roomId);

        //check if user are in room
        if(!room.members.includes(userId) && room.creator != userId) {
            throw new createHttpError(401, "User doesn't includes in room!");
        }

        room.chat = [];

        const resDB = await room.save();

        return res.json({
            message: 'ok',
            data: resDB
        })
    } catch (error) {
        next(error)
    }
})
module.exports = route;