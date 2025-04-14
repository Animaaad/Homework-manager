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
    console.log("select *")
    return pool.query(`select * from public.homeworks h`);
};
/*exports.addMessage = function (message) {
    return pool.query("insert into public.homeworks(id, user_id, text) values($1, $2, $3)",
        [message.id, message.user_id, message.text]);
};*/
