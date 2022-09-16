import express from 'express';
import * as productController from '../Controllers/product.controller.js';

const router = express.Router();

router.get('/product', productController.product);

export default router;