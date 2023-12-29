
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    // name, description, category, price, stock, and image URL)

    product_Name: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: Number,

    image_URL: {
        type: String,
    }



}, { timestamps: true });

module.exports = new mongoose.model("Product", productSchema)