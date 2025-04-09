
var express = require('express');
const messages = ["lol", "ahahaha"]; // sample data
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json(messages);
});

router.post('/', function (req, res, next) {
    messages.push(req.body);
    res.status(200);
});

module.exports = router; // ESM: exports
