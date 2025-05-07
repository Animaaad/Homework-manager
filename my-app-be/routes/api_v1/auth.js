var express = require('express'); // ESM: import
var { getUser } = require('../../models/users.js');
var { comparePassword, hashPassword } = require('../../utils/authHelpers.js');
const { config } = require('../../config/config.js');
var router = express.Router();
var pool = require('../../config/db.js');

router.post("/register", async (req, res) => {
    console.log("kkk");
    const { id, first_name, last_name, username, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        await pool.query(
            `INSERT INTO users (id, username, password, first_name, last_name, is_teacher)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [id, username, hashedPassword, first_name, last_name, false]
        );

        console.log("User successfully created");
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        if (err.code === '23505') {
            res.status(409).json({ error: 'User already exists' }); // Conflict
        } else {
            console.error("Unexpected error:", err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    getUser(username)
        .then((result) => {
            if (result.rows && result.rows.length === 1) {
                user = result.rows[0];
                const id = result.rows[0].id;
                const hashedPassword = result.rows[0].password;
                comparePassword(password, hashedPassword)
                    .then((isValid) => {
                        if (isValid) {
                            req.session.userId = id;  // creates session
                            return res.json({ user });
                            //return res.status(200).end();
                        }
                        // invalid password
                        else {
                            console.log("Invalid password");
                            return res.status(401).end();
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        // internal server error
                        res.status(500).end();
                    })
            }
            // user does not exist
            else {
                console.log("User does not exist");
                return res.status(401).end();
            }
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).end();
        })
});



router.delete("/logout", (req, res) => {
    console.log("llllll")
    if (req.session && req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).end();  // internal server error
            } else {
                // clear the cookie in the browser
                res.clearCookie(config.session.cookieName);
                return res.status(200).end();  // successful logout
            }
        });
    } else {
        return res.status(400).end();  // bad request - session doesn't exist
    }
});

router.get('/me', async (req, res) => {
    const userId = req.session.userId;
    //console.log(userId)

    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const result = await getUser(userId);
        const user = result.rows[0];
        //console.log(user + "qaqaqaq")
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        //console.log(user);
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;