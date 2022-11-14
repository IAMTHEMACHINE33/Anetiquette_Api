const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController");
const multer = require("multer")
const router = express.Router();

const upload = multer();

router.route("/register").post(upload.none(), registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)

module.exports = router;