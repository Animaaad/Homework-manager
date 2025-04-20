const { Pool } = require('pg');
//require('dotenv').config()
const { config } = require('../config.secrets')
const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
});

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

exports.addHomework = function (homework, creator) {
    return pool.query("insert into public.homeworks(id, title, text, assignment_day, due_date, creator, is_public) values($1, $2, $3, $4, $5, $6, $7)",
        [homework.id, homework.title, homework.text, homework.assignment_date, homework.due_date, creator, homework.is_public]);
};


