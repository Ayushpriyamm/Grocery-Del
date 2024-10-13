import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        unique:true,
        required:true
    },

    password: {
        type: String,
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

})

const User = mongoose.model('User', userSchema);

export default User;