const express = require("express")
const apiController = require("../../controllers/api/auth")

const router = express.Router();

router.post("/login", loginController.postLogin);
router.post("/register", loginController.postSignUp);
router.post("/logout", loginController.postLogout);

module.exports= router