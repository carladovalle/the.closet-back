/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb';
import db from '../Database/db.js';

async function addWishlist(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const productInfo = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) });

    const productId = productInfo._id;

    delete productInfo._id;

    await db.collection('wishlist').insertOne({
      ...productInfo,
      productId,
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

      await db.collection('products').updateMany(
        {
          userWishlist: { $in: [user._id.toString()] },
        },
        { $pull: { userWishlist: user._id.toString() } }
      );
      return res.sendStatus(201);
    }

    await db.collection('wishlist').deleteOne({
      productId: new ObjectId(id),
    });

    await db
      .collection('products')
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { userWishlist: user._id.toString() } }
      );

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

async function listWishlistProducts(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    const session = await db.collection('sessions').findOne({ token });

    if (session) {
      const user = await db
        .collection('users')
        .findOne({ _id: session.userId });
      const products = await db
        .collection('wishlist')
        .find({ userId: user._id })
        .toArray();
      return res.status(200).send(products);
    }
    return res.status(200).send([]);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function updateWishlistUserList(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const { user } = res.locals;

  try {
    if (status) {
      await db
        .collection('products')
        .updateOne(
          { _id: new ObjectId(id) },
          { $addToSet: { userWishlist: user._id.toString() } }
        );
    } else {
      await db
        .collection('products')
        .updateOne(
          { _id: new ObjectId(id) },
          { $pull: { userWishlist: user._id.toString() } }
        );
    }

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

export {
  addWishlist,
  removeWishlist,
  listWishlistProducts,
  updateWishlistUserList,
};
