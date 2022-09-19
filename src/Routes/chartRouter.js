/* eslint-disable import/extensions */
import express from 'express';
import * as chartController from '../Controllers/chart.controller.js';
import { authToken } from '../Middlewares/authTokenMiddleware.js';

const router = express.Router();

router.post('/chart/:id', authToken, chartController.addCart);
router.delete('/chart/:productId', authToken, chartController.removeProduct);
router.put('/chart/:productId', authToken, chartController.updateProductAmount);
router.get('/chart', authToken, chartController.listSelectedProducts);

export default router;
