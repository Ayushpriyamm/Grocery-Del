import mongoose from "mongoose";
import Counter from "./counterModel.js";

const orderSchema =new mongoose.Schema({
    orderId: {
        type: String,
        unique:true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'DeliveryBoy'
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Store',
    },
    items: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true
            },
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true
            },
            count: {
                type: Number,
                default:1,
                required:true 
            }
        }
    ],
    deliveryLocation: {
        lattitude: {
            type: Number,
            required:true,
            
        },
        longitude: {
            type: Number,
            required:true,
        },
        address: {
            type: String,
        }
    },
    pickUpLocation: {
        lattitude: {
            type: Number,
            required:true,
            
        },
        longitude: {
            type: Number,
            required:true,
        },
        address: {
            type: String,
        }
    },
    deliveryPersonLocation: {
        lattitude: {
            type: Number,
            
            
        },
        longitude: {
            type: Number,
            
        },
        address: {
            type: String,
        }
    },
    status: {
        type: String,
        enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
        default:"available"
    },
    totalPrice: {
        type: Number,
        required:true
    },
    createdAt: {
        type: Date,
        default:Date.now,
    },
    updatedAT: {
        type: Date,
        default:Date.now,
    }
})

//generating sequence value for order id
const getSequenceValue =async (sequenceName) => {
    const sequenceDocument = await Counter.findOneAndUpdate(
        {
            name:sequenceName
        },
        {
            $inc:{sequence_value:1}
        },
        {
            new:true,upsert:true
        }
    
    )
    return sequenceDocument.sequence_value;
}

orderSchema.pre("save",async function (next) {
    if (this.isNew) {
        const sequenceValue = await getSequenceValue("orderId");
        this.orderId = `ORDR${sequenceValue.toString().padStart(5, "0")}`;
    }
    next();
})

const Order = mongoose.model("Order", orderSchema);
export default Order