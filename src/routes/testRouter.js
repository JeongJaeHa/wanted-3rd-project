const express = require("express")
const router = express.Router();

const controller = require("../controllers/contorller");

router.post("/", controller.controller);

module.exports = {
    router
}