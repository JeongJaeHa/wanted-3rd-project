const { AppDataSource } = require("./datasource");
const { v4: uuid } = require('uuid');
const posts = require("../entities/posts");
const responseMessage = require("../constants/responseMessage");
const statusCode = require("../constants/statusCode");
const Error = require("../middlewares/errorConstructor");

const createPost = async (title, content, hashedPassword, weather) => {
    try{
        const id = uuid();

        return await AppDataSource
        .createQueryBuilder()
        .insert()
        .into("posts")
        .values({id: id, title: title, content: content, password: hashedPassword, weather: weather})
        .execute()
    } catch(err) {
        throw new Error(responseMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR);
    }
}

const getPassword = async (id) => {    
    try {
        return await AppDataSource
            .createQueryBuilder()
            .select(["password"])
            .from(posts, "posts")
            .where("id=:id", {id: id})
            .execute()
    } catch (err) {
        throw new Error(responseMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR);
    }
}

const editPost = async (id, title, content) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .update(posts, "posts")
            .set({title: title, content: content})
            .where("id=:id", {id: id})
            .execute()
    } catch (err) {
        throw new Error(responseMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR);
    }
}

const getPost = async(id) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .select([
                "id AS id",
                "title AS title",
                "content AS content",
                "weather AS weather"
            ])
            .from(posts, "posts")
            .where("id=:id", {id: id})
            .execute()
    } catch (err) {
        throw new Error(responseMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR);
    }
}

const getList = async(pointer) => {
    try {
        if(!pointer) {
            return await AppDataSource
            .createQueryBuilder()
            .select([
                "id AS id",
                "title AS title",
                "DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS date",
                "CONCAT(LPAD(DATE_FORMAT(created_at, '%Y%m%d%H%i%s%f'), 16, '9')) AS pointer"
            ])
            .from(posts, "posts")
            .orderBy("created_at", "DESC")
            .limit(5)
            .execute()
        } else
        return await AppDataSource
            .createQueryBuilder()
            .select([
                "id AS id",
                "title AS title",
                "CONCAT(LPAD(DATE_FORMAT(created_at, '%Y%m%d%H%i%s%f'), 16, '9')) AS pointer"
            ])
            .from(posts, "posts")
            .where("CONCAT(LPAD(DATE_FORMAT(created_at, '%Y%m%d%H%i%s%f'), 16, '9')) < :pointer", {pointer: pointer})
            .orderBy("created_at", "DESC")
            .limit(5)
            .execute()
    } catch (err) {
        throw new Error(responseMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR);
    }
}

const existCheck = async(id) => {
    try {
        return await AppDataSource
            .createQueryBuilder()
            .select(["*"])
            .from(posts, "posts")
            .where("id=:id", {id: id})
            .execute()
    } catch (err) {
        throw new Error(responseMessage.INTERNAL_SERVER_ERROR, statusCode.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createPost,
    getPassword,
    editPost,
    getPost,
    getList,
    existCheck
}