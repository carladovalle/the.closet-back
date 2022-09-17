import db from '../Database/db.js';
import { cartAndWishlistSchema } from '../Schemas/cartAndWishlistValidation.js';
import { reviewsSchema } from '../Schemas/reviewsValidation.js';

async function product (req, res) {
    try {
        const product = {
            name: "Tênis Lacoste Masculino",
            description: "Para caminhadas e corridas leves, treinos de musculação ou até mesmo no dia a dia aposte no conforto e qualidade do Tênis Nike Feminino Revolution 6 Next Nature para completar seu look.",
            search: "tenis masculino lacoste",
            price: "26910",
            image: "https://imgcentauro-a.akamaihd.net/230x230/96943362.jpg",
            color: ["red", "black", "pink"],
            size: ["35", "36", "37", "38", "39", "40", "41"],
            amount: 1,
            comments: []
        }
        await db.collection('produts').find(product).toArray();
        res.status(200).send(product); 
    } catch (error) {
        return res.send(error.message);
      }
}

async function addCart (req, res) {

    const validation = cartAndWishlistSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send(401);
    }

    try {

        const session = await db.collection('sessions').findOne({
            token,
        });

        if (!session) {
            return res.send(401);
        }

        const user = await db.collection('users').findOne({
            _id: session.userId
        });

        if (!user) {
            return res.send(401);
        }

        const { color, size } = req.body;

        await db.collection('cart').insertOne({
            color,
            size
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

async function addWishlist (req, res) {

    const validation = cartAndWishlistSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send(401);
    }

    try {

        const session = await db.collection('sessions').findOne({
            token,
        });

        if (!session) {
            return res.send(401);
        }

        const user = await db.collection('users').findOne({
            _id: session.userId
        });

        if (!user) {
            return res.send(401);
        }

        const { color, size } = req.body;

        await db.collection('wishlist').insertOne({
            color,
            size
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

async function reviews (req, res) {

    const validation = reviewsSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    try {

        const { nameComment, comment } = req.body;

        await db.collection('comments').insertOne({
            nameComment,
            comment
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

async function getReviews (req, res) {

    try {

        const comments = await db.collection('comments').find({}).toArray();

        res.status(201).send(comments);
    } catch (error) {
        return res.send(error.message);
      }

}

export { product, addCart, addWishlist, reviews, getReviews }