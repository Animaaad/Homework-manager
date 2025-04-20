var pool = require('../config/db.js');

// use parameterized queries to prevent SQL injection !

// returns promise !
exports.getUsers = function(username) {  
    console.log("jjjj") 
    return pool.query(
        "select * from public.users u where u.username = $1",
        [username]
    );
};
