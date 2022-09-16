/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authRouter.js';
import searchRouter from './Routes/searchRouter.js';
import productRouter from './Routes/productRouter.js';

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(searchRouter);
server.use(productRouter);

server.listen(5000, () => console.log('Listening on port 5000'));
