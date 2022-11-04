const postDao = require("../models/postDao");
const Error = require("../middlewares/errorConstructor");
const bcrypt = require("bcrypt");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const request = require("request");
const postValidation = require("../utils/postCheck");

const todayWeather = async() => {
    const options = "http://api.weatherapi.com/v1/current.json?key="+ process.env.API_KEY +"&q=seoul&aqi=no"
    return new Promise(function(resolve, reject) {
        request(options,async function(err,body) {
            if (err) {
            throw new Error(err.message, 404)
        } else {
            resolve(JSON.parse(body.body).current.condition.text);
        }
        })
    })
}

const createPost = async (title, content, password) => {
    const weather = await todayWeather();
    const hashedPassword = await bcrypt.hash(password, 12);
    await postDao.createPost(title, content, hashedPassword, weather);
}

const editPost = async (id, title, content, password) => {
    await postValidation.postExist(id);
    await postValidation.passwordCheck(id, password);
    await postDao.editPost(id, title, content);
}

const getPost = async(id) => {
    const page = await postDao.getPost(id);
    if(page.length == 0) throw new Error(responseMessage.PAGE_NOT_EXIST, statusCode.BAD_REQUEST);
    return page
}

const getList = async(pointer) => {
    const list = await postDao.getList(pointer);
    return list
}

module.exports = {
    createPost,
    editPost,
    getPost,
    getList
}