const roomService = require('./room.service')

module.exports = {
    CreateRoom: async(req, res, next) => {
        try {
            const DTO = await roomService.CreateRoom(req);

            return res.json({
                message: 'success',
                data: DTO
            });
        } catch (error) {
            next(error);
        }
    }, 
    GetRoomById: async(req, res, next) => {
        try {
            const DTO = await roomService.GetRoomById(req.params.id);

            return res.json({
                message: 'success',
                data: DTO
            })
        } catch (err) {
            next(err);            
        }
    },
    GetAllRoom: async(req, res, next) => {
        try {
            const DTO = await roomService.GetAllRoom(req.query);

            return res.json({
                message: 'ok',
                data: DTO
            })
        } catch (error) {
            next(error)
        }
    },
    SearchByName: async(req, res, next) => {
        try {
            const DTO = await roomService.SearchByName(req.params.name)
            
            return res.json({
                message: 'ok',
                data: DTO
            })
        } catch (error) {
            next(error);
        }
    }
}