import { ObjectId } from 'mongodb';
import db from '../Database/db';

async function removeProduct(req, res) {
  const { userId } = res.locals;
  const productId = new ObjectId(req.params);

  try {
    const product = await db.collection('chart').findOne({ _id: productId });

    if (product.userId !== userId) {
      return res
        .status(401)
        .send(
          'Você não é o dono deste produto e, portanto, não pederá removê-lo'
        );
    }

    await db.collection('chart').deleteOne({ _id: productId });
    return res.sendStatus(201);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

function updateProductAmount(req, res) {
  const x = req.body;
  return res.send(x);
}

export { removeProduct, updateProductAmount };
