var express = require("express");
var app = express();
var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const secretKey = '359c1671fb6b75f006327633b30b20edc0db6fbc113b59db36d29e91c6884296';
console.log('Secret Key:', secretKey);


var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs'); // Set the template engine 





// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'stuff'
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log(err)
    } 
     else{
        console.log('Looking good the database connected')
    }
})


// **********************************  Code from here **************************
app.get('/', function(req,res){
    let sql = 'SELECT * FROM candidates';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        
        res.render('candidates', {result})   
    });
    
})



app.post('/search', function(req, res) {
    let searchTerm = req.body.search; // Assuming the search term is passed via query parameter
    let sql = `SELECT * FROM candidates WHERE candidateName = ?`;
    let query = db.query(sql, [searchTerm], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('candidates', { result });
    });
});

app.get('/join', function(req, res) {
    
        res.render('join');
  
});



app.post('/register', function(req, res) {
    let name = req.body.name; // Assuming the search term is passed via query parameter
    let card = req.body.card; // Assuming the search term is passed via query parameter
    let pass = req.body.pass; // Assuming the search term is passed via query parameter
    let sql = `INSERT INTO candidates (candidateName, creditcard, passwordHash) VALUES (?, ?, ?)`;
    let query = db.query(sql, [name, card, pass], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});


app.post('/registers',async function(req, res) {
    let name = req.body.name; 
    let card = req.body.card; 
    let pass = req.body.pass;
    
    var hashedPassword = await bcrypt.hash(pass, 10);

console.log(hashedPassword)

    let sql = `INSERT INTO candidates (candidateName, creditcard, passwordHash) VALUES (?, ?, ?)`;
    let query = db.query(sql, [name, card, hashedPassword], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});


app.post('/registerc', function(req, res) {
    let name = req.body.name;
    let card = req.body.card;
    let pass = req.body.pass;

    // Generate a random initialization vector (IV)
    let iv = crypto.randomBytes(16);

    // Log encryption parameters for debugging
    console.log('Secret Key:', secretKey);
    console.log('IV:', iv.toString('hex'));
    
    // Encrypt the credit card information using AES encryption with a secret key
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encryptedCard = cipher.update(card, 'utf8', 'hex');
    encryptedCard += cipher.final('hex');

    // Hash the password (for security)
    let hashedPassword = bcrypt.hashSync(pass, 10);

    // Insert the encrypted credit card information, hashed password, and IV into the database
    let sql = `INSERT INTO candidates (candidateName, creditcard, passwordHash, iv) VALUES (?, ?, ?, ?)`;
    let query = db.query(sql, [name, encryptedCard, hashedPassword, iv.toString('hex')], (err, result) => {
        if (err) {
            console.error('Error inserting candidate:', err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(result);
        res.redirect('/');
    });
});




app.get('/decripted', function(req, res) {
    // Retrieve data from the database (assuming db.query returns a Promise)
    db.query('SELECT * FROM candidates WHERE Id = 16', (err, rows) => {
        if (err) {
            console.error('Error fetching candidates:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        if (rows.length === 0) {
            return res.status(404).send('No candidate found with the specified ID');
        }
        
        const candidate = rows[0]; // Assuming only one row is returned

        // Retrieve encrypted credit card data and IV from the database
        const encryptedCard = candidate.creditcard;
        const iv = Buffer.from(candidate.iv, 'hex'); // Convert IV from hex string to Buffer

        // Log encryption parameters and encrypted data for debugging
        console.log('Secret Key:', secretKey);
        console.log('IV:', iv.toString('hex'));
        console.log('Encrypted Card:', encryptedCard);

        // Decrypt the credit card data using AES-256-CBC with the secret key
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);

        let decryptedCard = decipher.update(encryptedCard, 'hex', 'utf8');
        decryptedCard += decipher.final('utf8');

        // Replace the encrypted credit card data with the decrypted data
        const decryptedCandidate = {
            candidateName: candidate.candidateName,
            creditcard: decryptedCard, // Replace with decrypted credit card data
            passwordHash: candidate.passwordHash
        };

        // Log the decrypted card for debugging
        console.log("Decrypted Card:", decryptedCandidate);

        // Render the decrypted data
        res.render('decripted', { decryptedCandidate: decryptedCandidate });
    });
});







// ' OR 1=1; # always evaluates to true, effectively bypassing any conditional logic in the SQL query




// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});