/* eslint-disable import/extensions */
import db from '../Database/db.js';

async function searchProducts(req, res) {
  const { keyword } = req.query;
  const search = keyword
    .split(' ')
    .filter((word) => word.length >= 3)
    .join(' ')
    .normalize('NFD');

  if (keyword) {
    try {
      const productsFound = await db
        .collection('products')
        .find({ $text: { $search: search } })
        .toArray();
      return res.status(200).send(productsFound);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  return res.status(200).send([]);
}

export { searchProducts };
