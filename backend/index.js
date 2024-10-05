import dotenv from "dotenv"
import express from "express";
import connectDB from "./config/dbConfig.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅app is running on port ${PORT}`);
})  