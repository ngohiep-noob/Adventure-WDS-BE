const route = require('express').Router()
const createHttpError = require('http-errors')
const path = require('path')
const { VerifyToken } = require('../../middleware/Authorization')
const Room = require('../../model/room')
const Chat = require('../../model/chat')
const User = require('../../model/user');

route.get('/', (req, res, next) => {
    try {
        return res.sendFile(path.join(__dirname, "../../../public/test-chat.html"))
    } catch (error) {
        next(new createHttpError(500, "internal server error!")); 
    }
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
        console.log(room.chat)

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
            historyChat = historyChat.slice(-LIMIT);
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

route.delete('/clear/:roomId', VerifyToken,async(req, res, next) => {
    try {
        const userId = req.userInfo.userId;
        const roomId = req.params.roomId;

        const room = await Room.findById(roomId);

        if(userId != room.creator)
        {
            return res.status(401).json({
                message: "Unauthorization"
            })
        }

        const resDel = await Promise.all(room.chat.map(c => {
            return Chat.deleteOne({ _id: c })
        }))
        
        room.chat = [];

        await room.save();
        
        console.log(resDel);

        return res.json({
            message: 'ok',
            data: resDel
        })
    } catch (error) {
        next(error)
    }
})

module.exports = route;