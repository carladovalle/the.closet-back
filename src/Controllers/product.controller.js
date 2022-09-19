/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import { ObjectId } from 'mongodb';
import db from '../Database/db.js';
import { reviewsSchema } from '../Schemas/reviewsValidation.js';

async function product(req, res) {
  const { id } = req.params;

  try {
    const productPromise = await db
      .collection('products')
      .findOne({ _id: ObjectId(id) });
    res.status(200).send(productPromise);
  } catch (error) {
    return res.send(error.message);
  }
}

async function reviews(req, res) {
  const validation = reviewsSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errorList = validation.error.details
      .map((err) => err.message)
      .join('\n');
    return res.status(400).send(errorList);
  }

  const { productId } = req.params;
  const newComment = req.body;
  try {
    await db.collection('products').updateOne(
      {
        _id: new ObjectId(productId),
      },
      { $addToSet: { comments: newComment } }
    );

    res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

async function addCart(req, res) {

  const { user } = res.locals;
  const { id } = req.params;

  try {

    if (!user) {
      return res.send(401);
    }

    const productInfo = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) });

    await db.collection('chart').insertOne({
      ...productInfo,
      userId: user._id,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

async function addWishlist(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const productInfo = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) });

    await db.collection('wishlist').insertOne({
      ...productInfo,
      userId: user._id,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

async function removeWishlist(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    if (id === 'clean') {
      await db.collection('wishlist').deleteMany({
        userId: user._id,
      });
    }

    await db.collection('wishlist').deleteOne({
      _id: new ObjectId(id),
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

export { product, addCart, addWishlist, reviews, removeWishlist };
