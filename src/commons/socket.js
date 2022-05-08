const createHttpError = require('http-errors');
const {Server} = require('socket.io');
const Chat = require('../model/chat')
const User = require('../model/user')
const Room = require('../model/room')

function init(server) {
    var io = new Server(server);
    io.on('connection', function (socket) {
        console.log("socket connected!");
        socket.on('from-client',async function(data) {
            try {
                console.log(data);
                const {senderId, content, roomId} = data;

                //save chat to chat model
                const saveChatRes = await Chat.create({
                    sender: senderId,
                    content: content
                })

                //save chat to chat field of room
                await Room.findByIdAndUpdate(roomId, {
                    $push: { chat: saveChatRes._id}
                })
                
                const resDB = await User.findById(senderId);
                
                let responseChat = {
                    senderName: resDB.username,
                    content: content
                }
                io.emit('from-server', responseChat)
                
            } catch (error) {
                throw createHttpError(500, error.message)
            }
        });
    });
    return io;
}

module.exports = init;