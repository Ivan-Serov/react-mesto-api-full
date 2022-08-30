const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { ERR_NOT_FOUND } = require('./utils/errorNumber');
const { auth } = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = require('./constants/constants');

const app = express();

app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedCors = [
  'http://localhost:3000/',
  'http://localhost:3001/',
  'http://mesto.IvanSerov.nomoredomains.sbs/signup',
  'https://mesto.IvanSerov.nomoredomains.sbs/',
  'http://api.mesto.IvanSerov.nomoredomains.sbs/',
  'https://api.mesto.IvanSerov.nomoredomains.sbs/',
];

app.use((req, res, next) => {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});

app.use(requestLogger);

/* const options = {
  origin: [
    'http://localhost:3000',
    'http://mesto.IvanSerov.nomoredomains.sbs/',
    'https://mesto.IvanSerov.nomoredomains.sbs/',
    'http://api.mesto.IvanSerov.nomoredomains.sbs/',
    'https://api.mesto.IvanSerov.nomoredomains.sbs/',
  ],
  credentials: true,
};

app.use('*', cors(options)); */
//app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(require('./routes/auth'));

app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use(errorLogger);
app.use(errors());
app.use((req, res) => {
  res.status(ERR_NOT_FOUND).send({ message: 'Такой страницы не существует' });
});
app.use(handleError);
mongoose.connect(DB_URL, () => {
  console.log(`Connected to db on ${DB_URL}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
