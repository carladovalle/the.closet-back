/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authRouter.js';
import searchRouter from './Routes/searchRouter.js';
import checkoutRouter from './Routes/checkoutRouter.js';
import productsRouter from './Routes/productsRouter.js';
import chartRouter from './Routes/chartRouter.js';
import wishlistRouter from './Routes/wishlistRouter.js';

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(searchRouter);
server.use(checkoutRouter);
server.use(productsRouter);
server.use(chartRouter);
server.use(wishlistRouter);

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
