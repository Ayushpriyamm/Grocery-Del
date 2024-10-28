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
    },

})

const DeliveryBoy = mongoose.model("DeliveryBoy", deliverBoySchema);

export default DeliveryBoy;