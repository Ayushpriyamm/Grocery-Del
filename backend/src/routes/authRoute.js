import express from "express";
import validator from "../middlewares/validator.js";
import {signin, signup} from "../controllers/authController.js"

const router = express.Router();

router.post('/signup', validator, signup);
router.post('/signin',  signin);

export default router;