import express from 'express';
import * as checkoutController from '../Controllers/checkout.controller.js';

const router = express.Router();

router.post('/checkout', checkoutController.checkout);

export default router;