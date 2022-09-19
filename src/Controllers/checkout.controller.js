/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import db from '../Database/db.js';
import { checkoutSchema } from '../Schemas/checkoutValidation.js';

async function checkout(req, res) {
  const validation = checkoutSchema.validate(req.body.buyerData, {
    abortEarly: false,
  });
  const newTransaction = req.body;
  const { user } = res.locals;

  if (validation.error) {
    const errorList = validation.error.details
      .map((err) => err.message)
      .join('\n');
    return res.status(400).send(errorList);
  }

  try {
    db.collection('users').updateOne(
      { _id: user._id },
      { $addToSet: { shopHistory: newTransaction } }
    );
    res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

async function cleanChart(req, res) {
  const { user } = res.locals;

  try {
    db.collection('chart').deleteMany({ userId: user._id });
    res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

export { checkout, cleanChart };
