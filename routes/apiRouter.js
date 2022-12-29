const express = require("express");
const router = express.Router();

const tempertureAPI = require("../api/temperture");
const bonCauAPI = require("../api/bonCau");

router.get("/temperture",tempertureAPI.get);
router.get("/toilet", bonCauAPI.get);

module.exports = router;