const dao = require("../models/dao");
const Error = require("../middlewares/errorConstructor")


const service = async (userId, newRefreshToken) => {
    await dao.dao(userId, newRefreshToken);
}

module.exports = {
    service
}