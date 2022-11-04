const postService = require("../services/postService")
const statusCode = require("../constants/statusCode");
const responseMessage = require("../constants/responseMessage");

/**
 *  @게시글_등록하기
 *  @route POST post
 *  @access public
 *  @err
 */
const createPost = async (req, res) => {
    const { title, content, password } = req.body;
    if( !title || !content || !password ){
        return res
        .status(statusCode.BAD_REQUEST).json({
            "message": responseMessage.NULL_VALUE,
            "statusCode": statusCode.BAD_REQUEST
        })
    }
    if(title.length > 20 || content.length > 200) {
        return res
        .status(statusCode.BAD_REQUEST).json({
            "message": responseMessage.OVER_WRITE,
            "statusCode": statusCode.BAD_REQUEST
        })
    }
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if( !reg.test(password)){
        return res
        .status(statusCode.BAD_REQUEST).json({
            "message": responseMessage.PASSWORD_ERROR,
            "statusCode": statusCode.BAD_REQUEST
        })
    }

    await postService.createPost(title, content, password);
    return res.status(statusCode.CREATED).json({
        "message": responseMessage.SUCCESS_POSTING,
        "statusCode": statusCode.CREATED
    })
}

/**
 *  @게시글_수정하기
 *  @route PATCH post
 *  @access public
 *  @err
 */
const editPost = async (req, res) => {
    const { id, title, content, password } = req.body;
    if( !title || !content || !password ){
        return res
        .status(statusCode.BAD_REQUEST).json({
            "message": responseMessage.NULL_VALUE,
            "statusCode": statusCode.BAD_REQUEST
        })
    }
    if(title.length > 20 || content.length > 200) {
        return res
        .status(statusCode.BAD_REQUEST).json({
            "message": responseMessage.OVER_WRITE,
            "statusCode": statusCode.BAD_REQUEST
        })
    }

    await postService.editPost(id, title, content, password);
    return res
    .status(statusCode.OK).json({
        "message": responseMessage.SUCCESS_EDIT_POSTING,
        "statusCode": statusCode.OK
    })
}

/**
 *  @게시글_조회하기
 *  @route GET post
 *  @access public
 *  @err
 */
const getPost = async(req, res) => {
    const { id } = req.query
        const page = await postService.getPost(id);
        return res.status(statusCode.OK).json({
            "message": responseMessage.SUCCESS,
            "statusCode": statusCode.OK,
            page: page
        })
}

/**
 *  @게시글_목록조회하기
 *  @route GET post/list
 *  @access public
 *  @err
 */
const getList = async(req, res) => {
    const { pointer } = req.query
    const list = await postService.getList(pointer);
    return res.status(statusCode.OK).json({
        "message": responseMessage.SUCCESS,
        "statusCode": statusCode.OK,
        list: list
    })
}


module.exports = {
    createPost,
    editPost,
    getPost,
    getList
}