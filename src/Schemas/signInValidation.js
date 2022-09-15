import joi from 'joi';

const userSchemaLogin = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { userSchemaLogin };