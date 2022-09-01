/* const {
  ERR_BAD_REQUEST,
  ERR_NOT_FOUND,
  ERR_SERVER,
} = require('./errorNumber'); */
const { ConflictError, BadRequestError } = require('./errors/allErrors');

const errorMessage = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return next(new BadRequestError('Неверный запрос или данные'));
  }
  if (err.code === 11000) {
    return next(new ConflictError('Пользователь с таким email уже существует'));
  }
  return next(err);
};

module.exports = { errorMessage };
/* const errorMessage = (err, req, res) => {
  if (err.name === 'Error') {
    res.status(ERR_NOT_FOUND).send({
      message: err.message,
    });
    return;
  }
  if (err.name === 'DocumentNotFoundError') {
    res.status(ERR_NOT_FOUND).send({
      message: 'Страница не найдена',
    });
    return;
  }
  if (err.name === 'CastError') {
    res.status(ERR_BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(ERR_BAD_REQUEST).send({
      message: err.message,
    });
    return;
  }

  res.status(ERR_SERVER).send({
    message: 'На сервере произошла ошибка',
  });
};

module.exports = { errorMessage }; */
