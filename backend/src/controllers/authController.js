import User from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from "../utlis/generateToken.js";



export const signup =async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(501).json({ errors: errors.array() });
    }

    const { name, mobile, password } = req.body;

    try {
        const user = await User.findOne({ mobile });
        
        if (user) {
            return res.status(400).json({message:"User alredy exist"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
    
        const newUser = await User.create({
            name,
            mobile,
            password:hashedPassword,
        })

        const token = generateToken(newUser._id);
        
        res.status(200).json({
            token,
             message: "Signup successfull",
             user: {
                id: newUser._id,
                name: newUser.name,
                phone: newUser.mobile,
                role: newUser.role
            }
        });
    } catch (error) {
        console.log(`❌❌❌❌${error}`);
        
        res.status(500).json({ message: "something went wrong" , error:error.message});
    }
}


export const signin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(501).json({ errors: errors.array() });
    }
    
    const { mobile, password } = req.body;

    if (!mobile) {
        return res.status(400).json({message:"Please enter your mobile number"})
    }
    if (!password) {
        return res.status(400).json({message:"Please enter password"})
    }

    if (!mobile && !password) {
        return res.status(400).json({message:"Both the feilds are required"})
    }

    try {
        const user = await User.findOne({ mobile: mobile });
    
         if (!user) {
            return res.status(404).json({message: "user not exist"})
        }

        const isCompare=await bcrypt.compare(password,user.password)
       
        if (!isCompare) {
            return res.status(400).json({message:"Incorrect password"})
        }

        const token = generateToken(user._id);
        res.status(200).json({
             token,
             message: "Signin Successfull",
             user: {
                 id: user.id,
                 name: user.name,
                 mobile: user.mobile,
                 role:user.role
            }})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}