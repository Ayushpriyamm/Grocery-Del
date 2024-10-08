import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    mobile: {
        type: Number,
        unique:true,
        required:true
    },

    role: {
        type: String,
        enum: ["Admin", "Customer", "DeliveryBoy"],
        default: "Customer",
        required:true
    },

    location: {
        lattitude: {
            type:Number
        },
        longitude: {
            type:Number
        }
    },

    address: {
        type:String
    }

}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;