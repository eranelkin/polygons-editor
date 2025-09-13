const express = require("express");
const router = express.Router();
const polygonController = require("../controllers/polygonController");

router.get("/", polygonController.getAll);
router.post("/", polygonController.create);
router.delete("/:id", polygonController.delete);

module.exports = router;
