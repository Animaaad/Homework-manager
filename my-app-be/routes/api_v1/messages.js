const { addMessage } = require('../../models/messages.js');
var express = require('express');
const { getMessages } = require('../../models/messages.js');
//const messages = ["lol", "ahahaha"];  sample data
var router = express.Router();

router.get('/', function (req, res, next) {
    getMessages().then((messages) => {
        res.json(messages.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
});

router.post('/', function (req, res, next) {
    addMessage(req.body).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log(e);
            res.status(500);
        }
    );
});

module.exports = router; // ESM: exports
