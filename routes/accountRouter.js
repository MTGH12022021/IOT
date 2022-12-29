const express = require("express");
const router = express.Router();
const passport = require("passport");
const accountController = require("../controllers/account");

router.get("/login", accountController.getLogin);

router.get("/register", accountController.getRegister);

router.post("/register", accountController.postRegister);

router.post("/login", accountController.postLogin);

router.get("/logout", accountController.getlogout);

module.exports = router;