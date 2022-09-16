import express from 'express';
import * as productController from '../Controllers/product.controller.js';

const router = express.Router();

router.get('/product', productController.product);
router.post('/cart', productController.addCart);
router.post('/wishlist', productController.addWishlist);
router.post('/reviews', productController.reviews);
router.get('/reviews', productController.getReviews);

export default router;