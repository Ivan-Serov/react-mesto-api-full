/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { errorMessage } = require('../utils/errorMessage');
const { NotFoundError } = require('../utils/errors/allErrors');
const { JWT_STORAGE_TIME, SALT_LENGTH, JWT_SECRET } = require('../constants/constants');


module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.getUser = (req, res, next) => {
  const { UserId } = req.params;
  console.log(req.params);
  User.findById(UserId)
    .orFail(() => {
      throw new NotFoundError('Пользователь (ID) не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, req, res, next));
};
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, SALT_LENGTH)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  // eslint-disable-next-line no-underscore-dangle
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь (ID) не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь (ID) не найден');
    })
    .then((user) => res.send({ data: user }))
    /* .then((user) => res.send(user)) */
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_STORAGE_TIME,
      });
      console.log({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};
