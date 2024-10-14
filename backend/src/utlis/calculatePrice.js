import Product from "../models/product.js";

export const CalculateTotalPrice = async(items) => {
        let totalPrice=0
        for (let i = 0; i < items.length; i++) {
            const product = await Product.findById(items[i].id);
            if (!product) {
                return res.status(404).json({message:"Product not found"})
            }
            totalPrice += product.price * items[i].count;
            }
        return totalPrice;
        }