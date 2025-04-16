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

exports.getHomeworks = function () {
    return pool.query(`select * from public.homeworks h`);
};

exports.addHomework = function (homework) {
    return pool.query("insert into public.homeworks(id, title, text, assignment_day, due_date) values($1, $2, $3, $4, $5)",
        [homework.id, homework.title, homework.text, homework.assignment_date, homework.due_date]);
};
