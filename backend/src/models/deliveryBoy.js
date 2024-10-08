import mongoose from "mongoose";

const deliverBoySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    mobile: {
        type: Number,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["DeliveryBoy"],
        default: "DeliveryBoy",
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
    },
    
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Store"
    }

},{timestamps:true})

const DeliveryBoy = mongoose.model("DeliveryBoy", deliverBoySchema);

export default DeliveryBoy;