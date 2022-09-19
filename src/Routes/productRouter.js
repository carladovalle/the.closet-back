/* eslint-disable import/extensions */
import express from 'express';
import * as productController from '../Controllers/product.controller.js';
import { authToken } from '../Middlewares/authTokenMiddleware.js';

const router = express.Router();

router.put('/product/:productId', productController.reviews);
router.get('/product/:id', productController.product);
router.post('/cart', productController.addCart);
router.post('/wishlist/:id', authToken, productController.addWishlist);

export default router;
