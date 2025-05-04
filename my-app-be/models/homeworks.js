//require('dotenv').config()
var pool = require('../config/db.js');

exports.getHomeworks = function (userId) {
    return pool.query(`
        WITH isTeacher AS (
            SELECT is_teacher FROM public.users WHERE id = $1
        )
        SELECT * FROM public.homeworks
        WHERE (
            (SELECT is_teacher FROM isTeacher) = false AND is_public = true
        ) OR (
            (SELECT is_teacher FROM isTeacher) = true AND creator = $1
        );
        `, [userId]);
};

exports.getStudentHomeworks = function (userId) {
    return pool.query(`
        SELECT * FROM public.homeworks h, public.students_homeworks sh
        WHERE h.id=sh.hwid AND sh.studentid = $1
        `, [userId]);
};

exports.addHomework = function (homework, creator) {
    return pool.query("insert into public.homeworks(id, title, description, assignment_date, due_date, creator, is_public) values($1, $2, $3, $4, $5, $6, $7)",
        [homework.id, homework.title, homework.description, homework.assignment_date, homework.due_date, creator, homework.is_public]);
};

exports.editSavedHomework = function (id, note) {
    return pool.query(
        `UPDATE public.students_homeworks SET note = $2 WHERE id = $1`,
        [id, note]
    )
};


