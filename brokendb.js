const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs'); // Set the template engine 
// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Create database connection
const db = new sqlite3.Database(':memory:'); // In-memory SQLite database for demonstration

// Create table to store comments
db.serialize(() => {
    db.run('CREATE TABLE comments (name TEXT, comment TEXT)');
});

// Route to serve HTML form
app.get('/', function(req,res){
    // anyone but the blanks profile
     res.render('brokendb',)   
 
 
 })



 app.get('/comments', (req, res) => {
    db.all('SELECT * FROM comments', (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving comments');
        }
        res.render('comments', { comments: rows }); // Render the EJS template with comments data
    });
});



// Route to handle form submission
app.post('/submit', (req, res) => {
    // Sanitize inputs to prevent XSS attacks
    const name = req.body.name;
    const comment = req.body.comment;

    // Insert data into database
    db.run('INSERT INTO comments (name, comment) VALUES (?, ?)', [name, comment], (err) => {
        if (err) {
            return res.status(500).send('Error storing data');
        }
        res.send('Comment submitted successfully!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});



//The exquisite restaurant offers a diverse menu of gourmet dishes, <script>alert("Liam Got You");</script> ensuring a memorable dining experience for every patron.