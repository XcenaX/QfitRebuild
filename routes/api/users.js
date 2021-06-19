const express = require("express")

const router = express.Router();

const apiController = require("../../controllers/api")

router.get("/users", apiController.getUsers);
router.get("/users/:id?", apiController.getUser);
router.post("/users", apiController.addUser);
router.put("/users/:id?", apiController.putUser);
router.delete("/users/:id?", apiController.deleteUser);

module.exports = router;