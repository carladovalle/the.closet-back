import db from '../Database/db.js';

async function checkout (req, res) {

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

        const { cpf,
            name,
            lastName,
            PhoneNumber,
            emailAdress,
            state,
            city,
            district,
            adress,
            number,
            complement,
            reference } = req.body;

        await db.collection('checkout').insertOne({
            cpf,
            name,
            lastName,
            PhoneNumber,
            emailAdress,
            state,
            city,
            district,
            adress,
            number,
            complement,
            reference
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

export { checkout }