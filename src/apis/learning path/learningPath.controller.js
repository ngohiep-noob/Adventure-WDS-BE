const learningPathService = require('./learningPath.service')

module.exports = {
    CreateLearningPath: async(req, res, next) => {
        try {
            const DTO = await learningPathService.CreateLearningPath(req);

            return res.json({
                message: 'ok',
                data: DTO
            })
        } catch (error) {
            next(error)
        }
    },
    GetLearningPathById: async(req, res, next) => {
        try {
            const DTO = await learningPathService.GetLearingPathById(req.params.id);
            
            return res.json({
                message: 'ok',
                data: DTO
            })
        } catch (error) {
            next(error)
        }
    },
    GetAllLearningPath: async(req, res, next) => {
        try {
            const DTO = await learningPathService.GetAllLearingPath(req.query)
            
            return res.json({
                message: 'ok',
                data: DTO
            })
        } catch (error) {
            next(error);
        }
    },
    SearchByName: async(req, res, next) => {
        try {
            const DTO = await learningPathService.SearchByName(req.params.name);

            return res.json({
                message: "ok",
                data: DTO
            })
        } catch (error) {
            next(error);
        }
    }
}