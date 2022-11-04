const postDao = require("../models/postDao");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const bcrypt = require("bcrypt");
const Error = require("../middlewares/errorConstructor");

const postExist = async (id) => {
    const result = await postDao.existCheck(id);
    if(result.length == 0) {
        throw new Error(responseMessage.PAGE_NOT_EXIST, statusCode.BAD_REQUEST);
    }
}

const passwordCheck = async (id, password) => {
    const hashedPassword = await postDao.getPassword(id);
    const decode = await bcrypt.compare(password, hashedPassword[0].password);
    if (!decode) {
        throw new Error(responseMessage.PASSWORD_VALIDATION_ERROR, statusCode.BAD_REQUEST);
    }
}

module.exports = {
    postExist,
    passwordCheck
}