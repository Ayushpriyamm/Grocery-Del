import express from 'express'
import { updateUserLocation } from "../utlis/geoCoder.js";
import { verifyUser } from '../middlewares/userVerify.js';

const router = express.Router();

// Route to update user location and convert to address
router.put('/location',verifyUser, updateUserLocation);

export default router;