import express from 'express'
import { fetchUser } from '../controllers/userController.js';
import { verifyUser } from '../middlewares/userVerify.js';

const router = express.Router();

router.get('/profile', verifyUser, fetchUser);


export default router