import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { CalculateTotalPrice } from "../utlis/calculatePrice.js";
import Store from "../models/storeModel.js";

export const createOrder = async(req,res) => {
    try {
        const  userId  = req.user._id;

        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message:"No items provided for the order",
            })
        }

        const totalPrice=await CalculateTotalPrice(items)

        const customerData = await User.findById(userId);

        const store = await Store.find();

        if (!store || store.length===0) {
            return res.status(404).json({ message: "Store not found" });
        }

        if (!customerData ) {
            return res.status(400).json({ message: "Customer not found" }); 
        }
        if ( !customerData.location) {
            return res.status(400).json({ message: "Customer location is missing" }); 
        }

        const newOrder = await Order.create({
            customer: userId,

            items: items.map((item) => ({
                id: item.id,
                item: item.item,
                count:item.count
            })),

            totalPrice: totalPrice,
            
            deliveryLocation: {
                lattitude: customerData.location.lattitude,
                longitude: customerData.location.longitude,
                address:customerData.address
            },
            pickUpLocation: {
                lattitude: store[0].location.lattitude,
                longitude: store[0].location.longitude,
                address:store[0].location.address
            },
            status:"confirmed",
        })

        return res.status(200).json({
            message: "Order created successfully ✅",
            newOrder
        })

        
    } catch (error) {
        console.log("Internal server error ❌❌")
        return  res.status(500).json({
            message: "Internal server error ❌❌",
            error:error.message
        })
    }
    
}