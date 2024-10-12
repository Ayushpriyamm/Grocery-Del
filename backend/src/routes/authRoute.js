import express from "express";
import {signinValidation, signupValidation} from "../middlewares/validator.js";
import {signin, signup} from "../controllers/authController.js"

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/signin', signinValidation, signin);

export default router;