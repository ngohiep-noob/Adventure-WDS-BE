
module.exports = {
    SearchByName: async(model, name) => {
        return await model.find({
            name: {
              $regex: name,
              $options: "i",
            },
        });
    }
}