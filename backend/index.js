import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/dbConfig.js";
import { admin, buildAdminRouter } from "./config/adminSetup.js";

dotenv.config();

const app = express();
app.use(express.json());

// Log server start
console.log('Starting server...');

// Connect to the database
connectDB();

// Build and mount the Admin Router
buildAdminRouter(app);

// Define a simple route
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`✅ App is running on http://localhost:${PORT}${admin.options.rootPath}`);
});
