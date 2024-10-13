import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    Image: {
        type: String,
    },

    stocks: {
        type: Number,
    },

});

const Product = mongoose.model("Product", productSchema);

export default Product;