const { addHomework } = require('../../models/homeworks.js');
var express = require('express');
const { getHomeworks } = require('../../models/homeworks.js');
var pool = require('../../config/db.js');
const { getStudentHomeworks } = require('../../models/homeworks.js');
const { editSavedHomework } = require('../../models/homeworks.js');
const { deleteHomework } = require('../../models/homeworks.js');
const { addSubject } = require('../../models/homeworks.js');
const { getSubjects } = require('../../models/homeworks.js');
const { changeCompletion } = require('../../models/homeworks.js');

//const messages = ["lol", "ahahaha"];  sample data
var router = express.Router();

router.get('/', function (req, res, next) {
    const userId = req.session.userId;
    //console.log(userId)
    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    getHomeworks(userId).then((homeworks) => {
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
});

router.post('/', async function (req, res, next) {

    //console.log("post");
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

router.post('/subjects', async function (req, res, next) {
    console.log("post");
    try {
        await addSubject(req.body);  
    }
    catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'User already exists' }); // Conflict
        } else {
            console.error("Unexpected error:", err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

router.post('/student/completion', async function (req, res, next) {
    console.log("post");
    try {
        await changeCompletion(req.body);
        console.log("hmm")
    }
    catch (err) {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/subjects', function (req, res, next) {
    getSubjects().then((homeworks) => {
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
});

router.post('/delete', function (req, res, next) {
    console.log(req.body);
    const { id } = req.body;
    deleteHomework(id).then(
        (r) => res.status(200)
    ).catch(
        (e) => {
            console.log(e);
            res.status(500);
        }
    );
});

router.post("/publish", (req, res) => {
    const { id, due_date, assignment_date, title, description, is_public } = req.body;
    console.log(title)
    pool.query(
        `UPDATE homeworks SET is_public = $6, due_date = $2, 
        assignment_date =$3, title = $4, description = $5 WHERE id = $1`,
        [id, due_date, assignment_date, title, description, is_public]
    )
        .then(() => res.status(200).send("Published"))
        .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/student", (req, res) => {
    const hwId = req.body.hwId;
    const id = req.body.id;
    const userId = req.session.userId;
    console.log(userId + " " + id + " " + hwId)
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
    const { id, note } = req.body
    console.log(note)
    editSavedHomework(id, note).then((homeworks) => {
        res.json(homeworks.rows)
    }).catch((err) => {
        console.log(err); res.status(500)
    })
})



module.exports = router;
