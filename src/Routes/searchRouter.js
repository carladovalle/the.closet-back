/* eslint-disable import/extensions */
import express from 'express';
import * as searchController from '../Controllers/search.controller.js';

const router = express.Router();

router.get('/search', searchController.searchProducts);

export default router;
