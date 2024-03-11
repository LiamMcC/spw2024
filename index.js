var express = require("express");
var app = express();
var mysql = require('mysql');

app.set('view engine', 'ejs'); // Set the template engine 

var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));

// Incorrect CORS Security configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const users = [
    { id: 1, username: 'admin', isAdmin: true },
    { id: 2, username: 'user', isAdmin: false }
];

// Middleware to simulate user authentication
function authenticate(req, res, next) {
    const userId = 2;
    const user = users.find(u => u.id == userId);
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    req.user = user;
    next();
}

// Middleware to restrict access to admin-only pages
function requireAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden');
    }
    next();
}




// **********************************  Code from here **************************
app.get('/', function(req,res){
   
        res.render('home',)   
    
    
})

app.get('/profile', authenticate, function(req,res){
   
    res.render('profile',)   


})

app.get('/orders', authenticate, requireAdmin, function(req,res){
   
    res.render('orders',)   


})


app.get('/register', function(req,res){
   
    res.render('register',)   


})

app.post('/register', (req, res) => {
    const { username, email } = req.body;

    if (!username) {
        console.log("No Username Given " )

    } else {
        console.log("The user is "  + username)
    }


    res.redirect('/')
});





// **********************************  Code to here **************************








app.get('/newuser/', function(req,res){
   // anyone but the blanks profile
    res.render('badprofile',)   


})









app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});




// app.use((req, res, next) => {
//     const allowedOrigins = ['http://example.com', 'https://example.com']; // Specify allowed origins
//     const origin = req.headers.origin;
    
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }

//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Specify allowed methods
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Specify allowed headers
    
//     // Handle preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });
