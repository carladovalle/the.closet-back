/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { ObjectId } from 'mongodb';
import db from '../Database/db.js';
import { reviewsSchema } from '../Schemas/reviewsValidation.js';
import { clothes } from '../productsDB/clothes.js';
import { shoes } from '../productsDB/shoes.js';

async function listAllProducts(req, res) {
  try {
    const products = await db.collection('products').find().toArray();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function product(req, res) {
  const { id } = req.params;

  try {
    const productPromise = await db
      .collection('products')
      .findOne({ _id: ObjectId(id) });
    return res.status(200).send(productPromise);
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

    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
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

export { populeProductsCollection, listAllProducts, product, reviews };
