const { addHomework } = require('../../models/homeworks.js');
var express = require('express');
const { getHomeworks } = require('../../models/homeworks.js');
var pool = require('../../config/db.js');
const { getStudentHomeworks } = require('../../models/homeworks.js');
const { editSavedHomework } = require('../../models/homeworks.js');

//const messages = ["lol", "ahahaha"];  sample data
var router = express.Router();

router.get('/', function (req, res, next) {
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

router.post('/', function (req, res, next) {
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
    const { id, due_date } = req.body;
    console.log(due_date)
    pool.query(
        `UPDATE homeworks SET is_public = TRUE, due_date = $2 WHERE id = $1`,
        [id, due_date]
    )
        .then(() => res.status(200).send("Published"))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/student", (req, res) => {
    const hwId = req.body.hwId;
    const id = req.body.id;
    const userId = req.session.userId;
    console.log(userId + " " + id + " " + hwId)
    pool.query("SELECT NOW()")
        .then((result) => console.log("DB time:", result.rows[0]))
    pool.query(
        `INSERT INTO public.students_homeworks (id, note, hwID, studentId)
         VALUES ($1, $2, $3, $4) `,
        [id, null, hwId, userId]
    )
        .then(() => res.status(200).send("Added"))
        .catch((err) => {
            console.error("Database insert error:", err);  // ← this will help
            res.status(500).json({ error: err.message })
        });
});

router.get("/student", (req, res) => {
    const userId = req.session.userId;
    console.log(userId)
    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    getStudentHomeworks(userId).then((homeworks) => {
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
})

router.post("/student/update", (req, res) => {
    console.log("aaa")
    const {id, note} = req.body
    console.log(note)
    editSavedHomework(id, note).then((homeworks) => {
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
})

module.exports = router;
