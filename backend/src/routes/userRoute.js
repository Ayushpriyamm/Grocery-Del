import express from 'express'
import { fetchUser, updateUser } from '../controllers/userController.js';
import { verifyUser } from '../middlewares/userVerify.js';
import { updateUserValidation } from '../middlewares/validator.js';

const router = express.Router();

router.get('/profile', verifyUser, fetchUser);
router.put('/updateProfile', updateUserValidation, verifyUser, updateUser);


export default router;