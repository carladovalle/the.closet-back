import db from '../Database/db.js';

async function product (req, res) {
    try {
        const product = {
            name: "Tênis",
            price: "350000",
            image: "https://imgcentauro-a.akamaihd.net/230x230/96943362.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci.",
            size: ["36", "38", "40", "42"],
            color: ["red", "black", "pink"]
        }
        await db.collection('produts').find(product).toArray();
        res.status(200).send(product); 
    } catch (error) {
        return res.send(error.message);
      }
}

async function addCart (req, res) {

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