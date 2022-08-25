const { BadRequestError } = require('./BadRequestError');
const { ConflictError } = require('./ConflictError');
const { NotFoundError } = require('./NotFoundError');
const { ForbiddenError } = require('./ForbiddenError');
const { UnauthorizedError } = require('./UnauthorizedError');

module.exports = {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
};
