const CategoryModel = require("../models/CategoryModel")
const UserModel = require("../models/UserModel");
const ConfigsModel = require("../models/configModel");
const SliderModel = require("../models/SliderModel");
const BannerModel = require("../models/BannerModel");
const CustomerModel = require("../models/CustomerModel")


const shareMw = {
    categories : async (req,res,next)=>{
        res.locals.categories = await CategoryModel.find();

        next()
    },
    emailUser : async (req,res,next)=>{
        const {_id} = req.session;
        res.locals.user = await UserModel.findById(_id)
        next();
    },
    emailCustomer : async (req,res,next)=>{
        const {email} = req.session;
        res.locals.customer = await CustomerModel.findOne({email})
        next();
    },
    cartItems : async (req,res,next)=>{
        res.locals.cartItems = req.session.cart;
        next();
    },
    formatPrice : async (req,res,next)=>{
        res.locals.formatPrice = (value)=>{
            return Intl
            .NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(value)
        }
        next();
    },
    config : async(req,res,next)=>{
        res.locals.config = await ConfigsModel.findOne();
        next();
    },

    sliders : async (req,res,next)=>{
        res.locals.sliders = await SliderModel.find();

        next();
    },

    banners : async(req,res,next)=>{
        res.locals.banners = await BannerModel.find();

        next();
    },
    userValidate : async(req,res,next)=>{
        const {_id} = req.session;
        res.locals.userValidate = await UserModel.findById(_id)
        next()
    }

}

module.exports = shareMw;