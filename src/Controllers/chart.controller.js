/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb';
import db from '../Database/db.js';

async function listSelectedProducts(req, res) {
  const { user } = res.locals;

  try {
    const productList = await db
      .collection('chart')
      .find({ userId: user._id })
      .toArray();
    return res.status(200).send(productList);
  } catch (error) {
    return res.status(401).send(error.message);
  }
}

async function removeProduct(req, res) {
  const { user } = res.locals;
  const { productId } = req.params;

  try {
    const product = await db
      .collection('chart')
      .findOne({ _id: new ObjectId(productId) });

    if (product.userId.toString() !== user._id.toString()) {
      return res
        .status(401)
        .send(
          'Você não é o dono deste produto e, portanto, não poderá removê-lo'
        );
    }

    await db.collection('chart').deleteOne({ _id: new ObjectId(productId) });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function updateProductAmount(req, res) {
  const { user } = res.locals;
  const { productId } = req.params;
  const newAmout = req.body;

  try {
    const product = await db
      .collection('chart')
      .findOne({ _id: new ObjectId(productId) });

    if (product.userId.toString() !== user._id.toString()) {
      return res
        .status(401)
        .send(
          'Você não é o dono deste produto e, portanto, não poderá removê-lo'
        );
    }

    await db
      .collection('chart')
      .updateOne({ _id: new ObjectId(productId) }, { $set: newAmout });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function addCart(req, res) {
  const { user } = res.locals;
  const { id } = req.params;

  try {
    const productInfo = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) });

    delete productInfo._id;

    await db.collection('chart').insertOne({
      ...productInfo,
      userId: user._id,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

export { listSelectedProducts, addCart, removeProduct, updateProductAmount };
