import express from 'express'
import { fetchallCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/all-categories',fetchallCategories)

export default router