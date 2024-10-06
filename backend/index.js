import dotenv from "dotenv"
import express from "express";
import connectDB from "./config/dbConfig.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
       
        console.log(`✅app is running on port ${PORT}`);   
})   
} catch (error) {
    console.log("❌server start failed",error)
}

