const { addHomework } = require('../../models/homeworks.js');
var express = require('express');
const { getHomeworks } = require('../../models/homeworks.js');
var pool = require('../../config/db.js');


//const messages = ["lol", "ahahaha"];  sample data
var router = express.Router();

router.get('/homeworks', function (req, res, next) {
    const userId = req.session.userId;
    console.log(userId)
    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    getHomeworks(userId).then((homeworks) => {
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
});

router.post('/homeworks', function (req, res, next) {
    console.log("post");
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    addHomework(req.body, userId).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log(e);
            res.status(500);
        }
    );
});

router.post("/publish", (req, res) => {
    const {id}  = req.body;
    console.log(id)
    pool.query(
        `UPDATE homeworks SET is_public = TRUE WHERE id = $1`,
        [id]
    )
        .then(() => res.status(200).send("Published"))
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
