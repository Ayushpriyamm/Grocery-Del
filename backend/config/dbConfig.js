import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ Databse connected successfully:${conn.connection.host}`);
        
        
    } catch (error) {
        console.error(`❌Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB