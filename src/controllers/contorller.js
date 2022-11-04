const service = require("../services/service")
const Error = require("../middlewares/errorHandler")

const controller = async (req, res) => {
    await service.service(req, res)
}

module.exports = {
    controller
}