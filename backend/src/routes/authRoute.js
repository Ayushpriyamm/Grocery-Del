import express from "express";
import {signinValidation, signupValidation} from "../middlewares/validator.js";
import {deliveryBoy, signin, signup} from "../controllers/authController.js"

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/signin', signinValidation, signin);
router.post('/delivery-login',signinValidation, deliveryBoy);

export default router;