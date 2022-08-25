/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const { errorMessage } = require('../utils/errorMessage');
const { NotFoundError, ForbiddenError } = require('../utils/errors/allErrors');

module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    /* .catch(next); */
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.getCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    /* .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next)); */
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return res.send(card);
    })
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, req, res, next));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res, next));
};
