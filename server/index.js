const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vinojan@1999',
    database: 'crud_db'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews;"
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(result);       // to show in browser
    });
})

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    });
})

// db.connect((err) => {
//     if (err) throw err;
//     console.log("Connected!");
//     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Valimai', 'Good bikers movie');"
//     db.query(sqlInsert, (err, result) => {
//         if (err) throw err;
//         console.log("Result: " + result);
//     });
// });

app.listen(3001, () => {
    console.log("Server started on PORT 3001")
})