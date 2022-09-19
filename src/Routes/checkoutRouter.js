import express from 'express';
import * as checkoutController from '../Controllers/checkout.controller.js';
import { authToken } from '../Middlewares/authTokenMiddleware.js';

const router = express.Router();

router.post('/checkout', authToken, checkoutController.checkout);

export default router;