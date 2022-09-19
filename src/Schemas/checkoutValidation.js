import joi from 'joi';

const checkoutSchema = joi.object({
  cpf: joi.number().required(),
  name: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.number(),
  emailAdress: joi.string().email().required(),
  confirmEmailAdress: joi.string().email().required(),
  cep: joi.number().required(),
  state: joi.string().required(),
  city: joi.string().required(),
  district: joi.string().required(),
  adress: joi.string().required(),
  number: joi.number().required(),
  complement: joi.string(),
  reference: joi.string(),
  paymentMethods: joi.string().required(),
  deliveryType: joi.string().required(),
  numberCard: joi.number(),
  nameCard: joi.string(),
  dateCard: joi.date(),
  codeCard: joi.number(),
  cpfCard: joi.number(),
  installments: joi.number(),
});

export { checkoutSchema };
