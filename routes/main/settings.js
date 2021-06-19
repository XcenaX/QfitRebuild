const express = require("express")

const settingsController = require("../../controllers/settings")

const router = express.Router();

router.get("/settings", settingsController.getSettings);

module.exports= router