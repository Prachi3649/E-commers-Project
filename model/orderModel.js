

const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        // required: true

    },
  
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
    
    shipping_address: {
        type: String,
    },
    status:  {
        type: String, 
        default: "pending"
    }

}, { timestamps: true });

module.exports = new mongoose.model("Order", orderSchema)