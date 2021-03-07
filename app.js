if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const faker = require('faker');
const mysql = require('mysql');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'join_us'
});

app.get('/', (req, res) => {
    const q = 'SELECT COUNT(*) AS count FROM users';
    connection.query(q, (err, results) => {
        if (err) throw err;
        const count = results[0].count;
        res.render('home', { count });
    });
})

app.post('/register', (req, res) => {
    var person = { email: req.body.email };
    connection.query('INSERT INTO users SET ?', person, (err, result) => {
        console.log(err);
        console.log(result);
        res.redirect('/');
    });
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})

