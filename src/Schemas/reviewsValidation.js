import joi from 'joi';

const reviewsSchema = joi.object({
  nameComment: joi.string().required(),
  comment: joi.string().required(),
});

export { reviewsSchema };