import express from 'express';
import * as checkoutController from '../Controllers/checkout.controller.js';
import { authToken } from '../Middlewares/authTokenMiddleware.js';

const router = express.Router();

router.put('/checkout', authToken, checkoutController.checkout);
router.delete('/checkout', authToken, checkoutController.cleanChart);

export default router;
