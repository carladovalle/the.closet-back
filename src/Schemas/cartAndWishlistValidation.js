import joi from 'joi';

const cartAndWishlistSchema = joi.object({
  color: joi.required(),
  size: joi.required(),
});

export { cartAndWishlistSchema };