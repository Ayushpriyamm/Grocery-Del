import mongoose from "mongoose";


const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    location:{
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

    deliveryBoys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"DeliveryBoy",
        }
    ]
})

const Store = mongoose.model("Store", storeSchema);

export default Store;