const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    profile: {
        type: String,
        default: 'customer'
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // unique : true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    }],


}, { timestamps: true });

module.exports = new mongoose.model("userModel", userSchema)
