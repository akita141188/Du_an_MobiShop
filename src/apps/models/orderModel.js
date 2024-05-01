const mongoose = require("../../common/database")();

const oderSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        default: 0,
    },
    items: [{
        prd_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            required: true
        },
        qty: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        name : {
            type : String,
            required: true,
        }
    }],

},{timestamps: true})

const oderModel = mongoose.model("Oders", oderSchema, "oders")
module.exports = oderModel;