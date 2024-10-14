import express from 'express'
import { verifyUser } from '../middlewares/userVerify.js';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create-order', verifyUser, createOrder)

export default router;