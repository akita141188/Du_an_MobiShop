const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const slug = require("slug")
const UserModel = require("../src/apps/models/UserModel")
require("dotenv").config()

// Lưu trữ thông tin cơ bản khi đăng nhập thành công
passport.serializeUser((user, done) => {
  done(null, user)
})

// Truy xuất thông tin người dùng
passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    // option for google stategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    UserModel.findOne({ socialId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // kiểm tra nếu đã có user theo biến socialId: profile.id thì đăng nhập vào
        done(null, currentUser)
      } else {
        // không có user tạo user mới
        new UserModel({
          provider: profile.provider,
          socialId: profile.id,
          email: profile.email,
          full_name: profile.displayName,
          username: slug(profile.displayName, { replacement: "" }),
          role: "admin",
        }).save().then((newUser) => {
          done(null, newUser);
        })
      }
    })
  })
)

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne({ socialId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // kiểm tra nếu đã có user theo biến socialId: profile.id thì đăng nhập vào
          done(null, currentUser)
        } else {
          // không có user tạo user mới
          new UserModel({
            provider: profile.provider,
            socialId: profile.id,
            email: profile.email || "facebook@gmail.com",
            full_name: profile.displayName,
            username: slug(profile.displayName, { replacement: "" }),
            role: "admin",
          }).save().then((newUser) => {
            done(null, newUser)
          })
        }
      })
    }
  ));

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
    function (accessToken, refreshToken, profile, done) {
      UserModel.findOne({ socialId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // kiểm tra nếu đã có user theo biến socialId: profile.id thì đăng nhập vào
          done(null, currentUser)
        } else {
          // không có user tạo user mới
          new UserModel({
            provider: profile.provider,
            socialId: profile.id,
            email: profile.email || "github@gmail.com",
            full_name: profile.username || "",
            username: profile.username,
            role: "admin",
          }).save().then((newUser) => {
            done(null, newUser)
          })
        }
      })
    }
  ));