const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    // name, email, password, and address

    profile: {
        type: String,
        default :'customer'
    },
    userName: {
        type: String,
        require: true
    },
    orders :[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    }],

    email: {
        type: String,
        // unique : true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }


}, { timestamps: true });

module.exports = new mongoose.model("userModel", userSchema)