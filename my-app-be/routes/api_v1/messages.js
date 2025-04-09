
var express = require('express');
const messages = ["lol", "hahaha"]; // sample data
var router = express.Router();

router.get('/', function (req, res, next) {
    res.json(messages);
});

module.exports = router; // ESM: exports
