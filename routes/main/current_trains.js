const express = require("express")

const currentTrainsController = require("../../controllers/current_trains")

const router = express.Router();

router.get("/", currentTrainsController.getTrains);

//router.post("/product/:id", currentTrainsController);

module.exports= router