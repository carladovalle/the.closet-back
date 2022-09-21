/* eslint-disable import/extensions */
import express from 'express';
import * as wishlistController from '../Controllers/wishlist.controller.js';
import { authToken } from '../Middlewares/authTokenMiddleware.js';

const router = express.Router();

router.post('/wishlist/:id', authToken, wishlistController.addWishlist);
router.delete('/wishlist/:id', authToken, wishlistController.removeWishlist);
router.put(
  '/wishlist/:id',
  authToken,
  wishlistController.updateWishlistUserList
);
router.get('/wishlist', wishlistController.listWishlistProducts);

export default router;
