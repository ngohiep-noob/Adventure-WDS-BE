const authService = require('./auth.service')

module.exports = {
    Login: async(req, res, next) => {
        try {
            const DTO = await authService.Login(req.body);
            return res.status(201).json(DTO)
        } catch (error) {
            next(error);
        }
    }, 
    Register: async (req, res, next) => {
        try {
            const DTO = await authService.Register(req.body);
            res.status(201).json(DTO);
        } catch (error) {
            next(error);
        }
    },
    Logout: async (req, res, next) => {
        try {
            const DTO = await authService.Logout(req.body);
            res.status(DTO.statusCode).json(DTO);
        } catch (error) {
            next(error);
        }
    }
    
}