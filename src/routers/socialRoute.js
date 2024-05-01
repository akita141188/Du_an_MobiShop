const express = require("express");
const router = express.Router();
const passport = require("passport");
const SocialController = require("../apps/controllers/SocialController")
const passportSetup = require("../../config/passport-setup")

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/admin/login" }), SocialController.googleCallback)

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/admin/login" }), SocialController.facebookCallback);



module.exports = router;