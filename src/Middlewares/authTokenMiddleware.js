/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import db from '../Database/db.js';

async function authToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .send(
        'Você não está logado em nosso site.\nPor gentileza, refaça o login'
      );
  }

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
      return res
        .status(401)
        .send(
          'Você não está logado em nosso site.\nPor gentileza, refaça o login'
        );
    }

    const user = await db.collection('users').findOne({ _id: session.userId });

    res.locals.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
    next();
  }
}

export { authToken };
