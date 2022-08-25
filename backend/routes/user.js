const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get(
  '/:UserId',
  celebrate({
    params: Joi.object().keys({
      UserId: Joi.string().length(24).hex(),
    }),
  }),
  getUser,
);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/),
  }),
}), updateUserAvatar);

module.exports = router;
