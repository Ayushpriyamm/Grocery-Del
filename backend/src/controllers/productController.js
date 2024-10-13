
import Product from "../models/product.js";

export const getAllProducts = async(req,res) => {
    
    try {
        const products = await Product.find();
        return res.status(200).json({
            message: "All product fetched successfully✅",
            totalProducts:products.length,
            products
        })
    } catch (error) {
        console.log("error fetching all products❌❌")
        return res.status(500).json({
            message: "Internal server error ",
             error: error.message
        })
    }


}

export const getProductByCategory = async(req, res) => {
    
    try {
        const { categoryId } = req.params;

        const allproducts =await Product.find({ category: categoryId });

        if (!allproducts || allproducts.length===0) {
            return res.status(404).json({
                message:"No product found!"
            })
        }

        return res.status(200).json({
            message: "Products fetched successfully ✅",
            totalProducts:allproducts.length,
            allproducts
            
        })
    } catch (error) {
        console.log("Error fetching product by category ❌❌")
        return res.status(500).json({
            message: "Internal server error ",
             error: error.message
        });
    }
    

}

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            console.log("product not exist");
            return res.status(404).json({
                message: "product not exist",
            })
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            product
        })
    } catch (error) {
        console.log("product not exist");
            return res.status(500).json({
                message: "Internal server error",
                error:error.message
            })
    }

}