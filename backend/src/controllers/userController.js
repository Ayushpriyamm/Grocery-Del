import User from "../models/userModel.js";
import {validationResult} from 'express-validator'

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

export const updateUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(501).json({ errors: errors.array() });
    }
    
    

    try {
        const userId = req.user._id;

        const { name, mobile } = req.body;

        const updatedFeilds = {};
        if (name) {
            updatedFeilds.name=name
        };
        if (mobile) {
            updatedFeilds.mobile=mobile
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedFeilds },
            { new: true, runValidators: true },
            
        )

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User details updated successfully",
            updatedUser
        });
        
        
    } catch (error) {
         res.status(500).json({ message: "Something went wrong", error: error.message });
    }


}