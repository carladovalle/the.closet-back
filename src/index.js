/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import authRouter from './Routes/authRouter.js';

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);

server.listen(5000, () => console.log('Listening on port 5000'));
