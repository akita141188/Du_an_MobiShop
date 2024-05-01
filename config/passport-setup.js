const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("config")
const UserModel = require("../src/apps/models/UserModel")
const slug = require("slug")
const dotenv = require("dotenv")

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((id,done)=>{
    UserModel.findById(id).then((user)=>{
        done(null,user)

    })
})

passport.use(
    new GoogleStrategy({
        callbackURL :process.env.GOOGLE_CALLBACK_URL,
        clientID : process.env.GOOGLE_CLIENT_SECRET,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,

    },(accessToken,refreshToken,profile,done)=>{
        UserModel.findOne({socialId: profile.id}).then((currentUser)=>{
            if(currentUser){
                done(null,currentUser)
            }else{
                new UserModel({
                    provider: profile.provider,
                    socialId: profile.id,
                    email: profile.emails[0].value,
                    full_name: profile.displayName,
                    username: slug(profile.displayName, { replacement: "" }),
                    role: "admin"
                }).save().then((newUser)=>{
                    done(null,newUser)
                })
            }
        })
    })
)

passport.use(
    new FacebookStrategy({
        callbackURL : process.env.FACEBOOK_CALLBACK_URL,
        clientID : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    },
    (accessToken,refreshToken,profile,done)=>{
        UserModel.findOne({socialId : profile.id}).then((currentUser)=>{
            if(currentUser){
                done(null,currentUser)
                console.log(profile);
            }else{
                new UserModel({
                    provider : profile.provider,
                    socialId : profile.id,
                    email: profile.emails || "facebook@gmail.com",
                    full_name: profile.displayName,
                    username: slug(profile.displayName, { replacement: "" }),
                    role: "admin",
                }).save().then((newUser)=>{
                    done(null,newUser)
                })
            }
        })
    }
)
)