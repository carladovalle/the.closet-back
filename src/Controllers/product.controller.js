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

export { product }