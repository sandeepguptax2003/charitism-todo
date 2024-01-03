const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middleware/errorMiddleware');
const { Connection } = require('./config/db');
const { todoRouter } = require('./routes/todo.route');
const { userRouter } = require('./routes/user.route');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;

// Log HTTP requests using Morgan
app.use(morgan('combined'));

// Log application-level logs using Winston
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Error middleware to handle errors in a consistent way
app.use(errorMiddleware);

// Middleware to parse JSON requests
app.use(express.json());

// CORS middleware to handle Cross-Origin Resource Sharing
app.use(cors());

// rate limiter for all routes
app.use(limiter);

// Default route for welcoming message
app.get('/', async (req, res) => {
  try {
    res.json('Welcome to the TODO API');
  } catch (error) {
    console.log(error);
  }
});

// Routing for user-related endpoints
app.use('/user', userRouter);
// Routing for todo-related endpoints
app.use('/todo', todoRouter);

// Starting the server and establishing a connection to the database
app.listen(PORT, async () => {
  try {
    await Connection;
    console.log('Connected to DB');
  } catch (error) {
    console.log('Failed to connect to DB');
  }
  console.log(`Server is running on ${PORT}`);
});
