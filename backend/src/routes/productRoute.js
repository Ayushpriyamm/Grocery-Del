import express from 'express'
import { getAllProducts, getProductByCategory, getProductById } from '../controllers/productController.js';

const router = express.Router();

//getting all products
router.get('/all-products', getAllProducts);

//get product by category
router.get('/product-category/:categoryId',getProductByCategory);

//get product by id
router.get('/:productId', getProductById);


export default router;