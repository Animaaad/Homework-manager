var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
var pool = require('./config/db');

var messagesRouter = require('./routes/api_v1/messages'); // ESM: import
const cors = require('cors');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/v1/messages', messagesRouter);

app.get('/api/v1/messages', (req, res) => {
  pool
    .query('SELECT * FROM homeworks')
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error');
    });
});

app.listen(3001, () => {
  console.log(`✅ Server running on http://localhost:${3001}`);
});

module.exports = app;

