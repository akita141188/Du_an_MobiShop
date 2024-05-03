const express = require("express");
const router = express.Router();
const passport = require("passport");
const SocialController = require("../apps/controllers/SocialController")
const passportSetup = require("../../config/passport-setup")

// passport.authenticate middleware, scope: yêu cầu trả về
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
// router xử lí callback, xác thực thất bại --> chuyển hướng  "/admin/login", xác thực thành công --> googleCallback
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/admin/login" }), SocialController.googleCallback)

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/admin/login" }), SocialController.facebookCallback);

router.get("/auth/github", passport.authenticate("github"));
router.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/admin/login" }), SocialController.githubCallback);



module.exports = router;