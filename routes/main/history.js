const express = require("express")

const historyController = require("../../controllers/history")

const router = express.Router();

router.get("/history", historyController.getHistory);

module.exports= router