/* eslint-disable no-console */
/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import db from './Database/db.js';

const server = express();
server.use(express.json());
server.use(cors());

server.get('/teste', (req, res) => res.send('Foi'));

server.listen(5000, () => console.log('Listening on port 5000'));
