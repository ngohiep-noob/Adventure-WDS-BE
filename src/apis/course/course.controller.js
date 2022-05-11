const courseService = require('./course.service')

module.exports = {
    CreateNewCourse: async (req, res, next) => {
        try {
            const DTO = await courseService.CreateNewCourse(req)
            return res.json({
                message: DTO.message,
                data: DTO.data
            })
        } catch (error) {
            next(error);
        }
    },
    GetCourseById: async(req, res, next) => {
        try {
            const DTO = await courseService.GetCourseById(req.params.id)
            return res.json({
                message: DTO.message,
                data: DTO.courseInfo
            })
        } catch (error) {
            next(error);
        }
    },
    GetAllCourse: async(req, res, next) => {
        try {
            const {qSort, qPage, pageSize} = req.query; 
            const DTO = await courseService.GetAllCourse(qPage, qSort, pageSize)
            return res.json({
                message: DTO.message,
                data: DTO.courseInfo
            })
        } catch (error) {
            next(error)
        }
    },
    SearchCourse: async(req, res, next) => {
        try {
            const DTO = await courseService.SearchByName(req.params.name);

            return res.json({
                message: 'success',
                response: DTO
            })
        } catch (error) {
            next(error);
        }
    },
    DeleteCourseById: async(req, res, next) => {
        try {
            const DTO = await courseService.DeleteCourseById(req.params.courseId);

            return res.json({
                message: "ok",
                data: DTO
            })
        } catch (error) {
            next(error);           
        }
    },
    UpdateCourseById: async(req, res, next) => {
        try {
            const DTO = await courseService.UpdateCourseById(req.params.id);

            return {
                message: "ok",
                data: DTO
            }
        } catch (error) {
            next(error);            
        }
    }
}