import { name } from "@adminjs/express";
import User from "../models/userModel.js";

export const fetchUser = (req, res) => {
    
    try {
        const user = req.user
    
    if (!user) {
        res.status(404).json({ message: "user not exist" });
    }

        res.status(200).json({
        message:"User fetched successfully",
        user:{
            id: user._id,
            name: user.name,
            mobile: user.mobile,
            role:user.role
        }
    })
    } catch (error) {
        console.log("Error fetching user",error)
        res.status(500).json({message:"Internal server error"})
    }
}