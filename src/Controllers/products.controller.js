/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { ObjectId } from 'mongodb';
import db from '../Database/db.js';
import { clothes } from '../productsDB/clothes.js';
import { shoes } from '../productsDB/shoes.js';

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

async function listAllProducts(req, res) {
  try {
    const products = await db.collection('products').find().toArray();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function listWishlistProducts(req, res) {
  const { user } = res.locals;

  try {
    const products = await db
      .collection('wishlist')
      .find({ userId: user._id })
      .toArray();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

function populeProductsCollection(req, res) {
  function shuffle() {
    return Math.random() - 0.5;
  }
  const organizedShoes = shoes.sort(shuffle);
  const organizedClothes = clothes.sort(shuffle);

  db.collection('products').insertMany(organizedShoes);
  db.collection('products').insertMany(organizedClothes);
  res.sendStatus(200);
}

export {
  listSelectedProducts,
  removeProduct,
  updateProductAmount,
  populeProductsCollection,
  listAllProducts,
  listWishlistProducts,
};
