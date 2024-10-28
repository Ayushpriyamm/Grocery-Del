import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/dbConfig.js";
import { admin, buildAdminRouter } from "./config/AdminSetup.js";
import authRoute from './src/routes/authRoute.js'
import userRoute from './src/routes/userRoute.js'
import productRoute from './src/routes/productRoute.js';
import categoryRoute from './src/routes/categoryRoute.js';
import orderRoute from './src/routes/orderRoute.js';
import locationRoute from './src/routes/userAddressRoute.js'
import otpRoute from './src/routes/otpRoute.js';

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

//signup route

app.use('/api/auth', authRoute)

app.use('/api/user', userRoute);

app.use('/api/product', productRoute);

app.use('/api/catergory', categoryRoute);

app.use('/api/order', orderRoute);

app.use('/api/location', locationRoute);

app.use('/api/otp', otpRoute);

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`✅ App is running on http://localhost:${PORT}${admin.options.rootPath}`);
});
