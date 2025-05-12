const express = require("express");
const User = require("../models/users");
const router = express.Router();
const passport = require("passport");
const userController = require("../controller/user");

router.route("/signUp")
    .get(userController.signupPage)
    .post(userController.signupUser);

// router.get("/signUp",userController.signupPage);

// router.post("/signup",userController.signupUser);
router.route("/login")
    .get(userController.loginPage)
    .post(passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.loginUser);
// router.get("/login",userController.loginPage);
// router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.loginUser);
router.get("/logout",userController.logout);

module.exports = router;