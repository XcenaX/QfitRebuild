const express = require("express")

const currentTrainsController = require("../../controllers/current_trains")

const router = express.Router();

router.get("/current_trains", currentTrainsController.getTrains);

//router.post("/products", currentTrainsController.postProducts);

module.exports= router