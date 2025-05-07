var pool = require('../config/db.js');

// use parameterized queries to prevent SQL injection !

// returns promise !
exports.getUser = function(username) {  
    //console.log("jjjj") 
    return pool.query(
        "select * from public.users u where u.username = $1 OR u.id = $1",
        [username]
    );
};
