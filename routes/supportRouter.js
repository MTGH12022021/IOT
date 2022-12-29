const express = require("express");
const router = express.Router();
const supportController = require("../controllers/support");

router.get("/",supportController.getSupport);
router.post("/", supportController.postSupport);
router.post("/buzzer", supportController.postSupportBuzzer);

module.exports = router;