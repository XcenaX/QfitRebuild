const express = require("express")

const emailController = require("../../controllers/email")

const router = express.Router();

router.post("/submit-review", emailController.postSubmitReview);
router.post("/submit-form", emailController.postSubmitForm);

module.exports= router