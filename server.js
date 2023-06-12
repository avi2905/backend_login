const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_tracker'
});

// define the login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection: ' + err.stack);
            return res.status(500).json({ error: 'could not connect to mysql' });
        }

        // query the database
        connection.query(
            'SELECT * FROM employees WHERE username = ? AND password = ?',
            [username, password],
            (error, results) => {
                // release the connection back to the pool
                connection.release();

                if (error) {
                    console.error('Error querying database: ' + error.stack);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (results.length === 0) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                // generate a JWT token and send it in the response
                const { employee_id, designation } = results[0];
                const token = jwt.sign({ employee_id, designation }, 'secret');
                return res.json({ token });
            }
        );
    });
});

// define a middleware to authenticate requests
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secret', (err, payload) => {
        if (err) {
            console.error('Error verifying token: ' + err.stack);
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = payload;
        next();
    });
}

// define a protected endpoint that requires authentication
app.get('/profile', authenticate, (req, res) => {
    const { employee_id, designation } = req.user;
    return res.json({ employee_id, designation });
});

// start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
