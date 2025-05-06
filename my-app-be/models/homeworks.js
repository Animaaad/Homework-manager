//require('dotenv').config()
var pool = require('../config/db.js');

exports.getHomeworks = function (userId) {
    return pool.query(`
        WITH isTeacher AS (
            SELECT is_teacher FROM public.users WHERE id = $1
        )
        SELECT * FROM public.homeworks h LEFT OUTER JOIN public.subjects s
        ON h.subject = s.code
        WHERE (
            (SELECT is_teacher FROM isTeacher) = false AND is_public = true
        ) OR (
            (SELECT is_teacher FROM isTeacher) = true AND creator = $1
        );
        `, [userId]);
};

exports.getSubjects = function (userId) {
    return pool.query(`SELECT * FROM public.subjects`);
};

exports.getStudentHomeworks = function (userId) {
    return pool.query(`
        SELECT * FROM public.homeworks h JOIN public.students_homeworks sh ON h.id=sh.hwid
        LEFT OUTER JOIN public.subjects s ON h.subject = s.code
        WHERE sh.studentid = $1
        `, [userId]);
};

exports.addHomework = function (homework, creator) {
    return pool.query
        (`INSERT INTO public.homeworks(id, title, description, assignment_date, due_date, creator, is_public, subject)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
            [homework.id, homework.title, homework.description, homework.assignment_date || null, 
                homework.due_date || null, creator, homework.is_public, 
                homework.subject.code]);
};

exports.deleteHomework = function (id) {
    return pool.query("DELETE FROM public.homeworks h WHERE h.id = $1",
        [id]);
};

exports.editSavedHomework = function (id, note) {
    return pool.query(
        `UPDATE public.students_homeworks SET note = $2 WHERE id = $1`,
        [id, note]
    )
};

exports.addSubject = function (subject) {
    return pool.query
        (`INSERT INTO public.subjects(name, code)
         VALUES($1, $2)`,
            [subject.name, subject.code]);
};


