var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const PgSession = require("connect-pg-simple")(session);
require('dotenv').config()

var indexRouter = require('./routes/index');
var authRouter = require('./routes/api_v1/auth');

var app = express();
var pool = require('./config/db');
const { config } = require('./config/config.js')

var homeworksRouter = require('./routes/api_v1/homeworks'); // ESM: import
const cors = require('cors');
app.use(cors());
app.use(cors({
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true  // Allow sending cookies
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

if (process.env.STATUS === 'production') {
  // trust proxy needed for secure cookie to work on render.com
  // because render.com uses a reverse proxy to handle HTTPS requests
  // and forwards the requests to the backend server over HTTP
  app.set('trust proxy', 1);
  }

// express-session middleware
app.use(
  session({
      store: new PgSession({
          pool, 
          tableName: "session",
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      name: config.session.cookieName,
      cookie: {
          secure: process.env.STATUS === 'production',
          httpOnly: true,
          sameSite: process.env.STATUS === 'production'?'none':'lax',
          maxAge: 1000 * 60 * 60 * 24 }            
           
  })
);

app.use('/api/v1', homeworksRouter);
app.use('/api/v1/auth', authRouter);
/*app.get('/api/v1/homeworks', (req, res) => {
  pool
    .query('SELECT * FROM homeworks')
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error');
    });
});*/

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;

