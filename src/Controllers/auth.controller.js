/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import db from '../Database/db.js';
import { userSchema } from '../Schemas/signUpValidation.js';

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const validation = userSchema.validate(req.body);
  const hasEmail = await db.collection('users').findOne({ email });

  if (validation.error) {
    const errorList = validation.error.details
      .map((err) => err.message)
      .join('\n');
    return res.status(400).send(errorList);
  }

  if (hasEmail) {
    return res
      .status(409)
      .send(
        'Já existe um usuário com este e-mail.\nPor gentileza, revise o e-mail informado ou faça seu login'
      );
  }

  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    await db.collection('users').insertOne({
      name,
      email,
      password: encryptedPassword,
    });
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}

export { registerUser };
