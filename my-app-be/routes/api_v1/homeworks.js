const { addHomework } = require('../../models/homeworks.js');
var express = require('express');
const { getHomeworks } = require('../../models/homeworks.js');

//const messages = ["lol", "ahahaha"];  sample data
var router = express.Router();

router.get('/', function (req, res, next) {
    getHomeworks().then((homeworks) => {
        console.log("ayaya");
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
});

router.post('/', function (req, res, next) {
    console.log("post");
    addHomework(req.body).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log("what")
            console.log(e);
            res.status(500);
        }
    );
});

module.exports = router;
