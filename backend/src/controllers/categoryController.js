import Category from "../models/categoryModel.js";

export const fetchallCategories = async(req,res) => {
    
    try {
        const categories = await Category.find();

        if (!categories) {
            console.log("No category exist❌❌");
            return res.status(500).json({
                message:"No category exist"
            })
        }
        return res.status(200).json({
            totalCategories: categories.length,
            message: "category fetched successfully✅",
            categories
        })
    } catch (error) {
        console.log("Internal server error❌❌");
        
        return res.status(500).json({
            message: "Internal server error❌❌",
            error:error.message
        })
    }

    
}