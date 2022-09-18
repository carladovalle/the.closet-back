/* eslint-disable import/extensions */
import express from 'express';
import * as productsController from '../Controllers/products.controller.js';
import { authToken } from '../Middlewares/authTokenMiddleware.js';

const router = express.Router();

router.post('/injectproducts', productsController.populeProductsCollection);
router.get('/products', productsController.listAllProducts);

router.use(authToken);
router.delete('/chart/:productId', productsController.removeProduct);
router.put('/chart/:productId', productsController.updateProductAmount);
router.get('/chart', productsController.listSelectedProducts);

export default router;
