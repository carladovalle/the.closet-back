import joi from 'joi';

const cartAndWishlistSchema = joi.object({
  color: joi.string(),
  size: joi.string(),
});

export { cartAndWishlistSchema };