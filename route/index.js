const express = require("express");
const deleteController = require("../controller/deleteController");
const router = express.Router();
const getController = require("../controller/getController");
const postController = require("../controller/postController");
const singleGetController = require("../controller/singleGetController");
const updateController = require("../controller/updateController");

router.get("/", getController);
router.post("/", postController);
router.get("/:id", singleGetController);
router.put("/:id", updateController);
router.delete("/:id", deleteController);

module.exports = router;
