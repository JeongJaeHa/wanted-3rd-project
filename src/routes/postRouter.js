const express = require("express")
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.patch("/", postController.editPost);
router.get("/", postController.getPost);
router.get("/list", postController.getList);

module.exports = {
    router
}