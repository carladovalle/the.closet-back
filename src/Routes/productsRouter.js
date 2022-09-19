/* eslint-disable import/extensions */
import express from 'express';
import * as productsController from '../Controllers/products.controller.js';

const router = express.Router();

router.post('/injectproducts', productsController.populeProductsCollection);

router.get('/products', productsController.listAllProducts);
router.put('/product/:productId', productsController.reviews);
router.get('/product/:id', productsController.product);

export default router;
