import OTP from "../models/otpModel.js";
import twilio from "twilio"
import User from "../models/userModel.js";
import { generateToken } from "../utlis/generateToken.js";

const accountSID = 'ACff38e33bfbcd1ee42366fc2fc2c61446';
const authToken = 'a4fd03ea9d34a444c5c036cb55374122';
const sender = '+18595688052';

const client = twilio(accountSID,authToken);


const createAndStoreOtp = async (mobile) => {
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    const otpDoc = new OTP({ mobile, code });

    await otpDoc.save();

    return code;
}

//funtion to send otp to registered mobile

export const sendOtp = async (req, res) => {

    try {
        const { mobile } = req.body;

        const verificationCode = await createAndStoreOtp(mobile);

        const message= await client.messages.create({
            body: `Your verification code for Basketry is ${verificationCode}`,
            from: sender,
            to:mobile,
        })

        console.log(message.sid);
        res.status(200).json({
            message: "OTP sent successfully✅",
        })
    } catch (error) {
        console.error('Error sending OTP:', error); // Log the error
        res.status(500).json({ // Return error response
            success: false,
            message: 'Error sending OTP',
        });
    }

}

//funtion to verify otp and let user signin or register

export const verifyOtp = async(req,res) => {
    const { mobile, code } = req.body;

    try {
        const otpEntry = await OTP.findOne({ mobile, code });

        if (!otpEntry) {
            return res.status(400).json({ message: "Invalid OTP ❌" });
        }

        // Check if OTP is still valid (not expired)
        const now = new Date();
        const timeDifference = now - otpEntry.createdAt;

        if (timeDifference > 10 * 60 * 1000) { // 10 minutes
            return res.status(400).json({ message: "OTP expired 😥" });
        }

        //if all the thing going good then ,proceed with registration or login

        let user = await User.findOne({ mobile });
        
        if (!user) {
             const randomUsername = 'USER' + Math.floor(1000 + Math.random() * 9000);
                user = await User.create({
                    mobile: mobile,
                    role: 'Customer',
                    name:randomUsername
                })
        }

        const token = generateToken(user);

        await OTP.deleteOne({ mobile });

        return res.status(200).json({
            message: "Authentication successfull✅",
            token,
            user: {
                id: user._id,
                name:user.name,
                mobile: user.mobile,
                role: user.role,
            },
        })

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Server error during OTP verification" });
    }
}

