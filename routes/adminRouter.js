const express = require("express");
const {registerAdmin, loginAdmin, logout, show} = require('../controllers/adminController');
const Admin = require("../models/adminModel");
const multer = require("multer");
const router = new express.Router();
const upload = multer();

router.route("/register_admin").post(upload.none(), registerAdmin)

router.route("/login_admin").post(loginAdmin)

router.route("/show_admin").get(show)

router.route("/logout").get(logout)
module.exports = router;
