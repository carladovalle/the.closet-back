import db from '../Database/db.js';
import { checkoutSchema } from '../Schemas/checkoutValidation.js';

async function checkout (req, res) {

    const validation = checkoutSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errorList = validation.error.details
        .map((err) => err.message)
        .join('\n');
      return res.status(400).send(errorList);
    }

    try {

        const {cpf,
            name,
            lastName,
            PhoneNumber,
            emailAdress,
            confirmEmailAdress,
            cep,
            state,
            city,
            district,
            adress,
            number,
            complement,
            reference,
            paymentMethods,
            numberCard,
            nameCard,
            dateCard,
            codeCard,
            cpfCard,
            installments } = req.body;

        await db.collection('checkout').insertOne({
            cpf,
            name,
            lastName,
            PhoneNumber,
            emailAdress,
            confirmEmailAdress,
            cep,
            state,
            city,
            district,
            adress,
            number,
            complement,
            reference,
            paymentMethods,
            numberCard,
            nameCard,
            dateCard,
            codeCard,
            cpfCard,
            installments
        });

        res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
      }

}

export { checkout }