

const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    // name, description, category, price, stock, and image URL)

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        // required: true

    },
    // items: [
    //     {
        productId: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product", 
            required: true
        }],
        quantity: {
            type: Number, 
            required: true, 
            default: 1
        },
    //     }
    // ],
    shipping_address: {
        type: String,
    },
    status:  {
        type: String, 
        default: "pending"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = new mongoose.model("Order", orderSchema)