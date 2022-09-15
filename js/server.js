const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const md5 = require('md5')
require('dotenv').config()
const PORT = process.env.PORT || 5050;
const db = require("./database.js")
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(express.json());
app.set('view engine', 'ejs')

const helper = require('./helper.js')

// Start page
app.get('/', (req, res) => {
    res.render('index.ejs', {quotes: helper.randomQuotes(3)})
})

// Login page
app.get('/login', (req, res) => {
    res.sendFile('login.ejs')
})

// Login endpoint
app.post('/login/submit', (req, res) => {
    const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?");
    const result = stmt.get(req.body.user, md5(req.body.pass));
	if(result === undefined) {
		res.status(404).json({"message":"Incorrect username or password. (404)"})
	} else {
        // let temp = result.json()
        let user = { id: result.id, user: result.user }
        const accessToken = generateAccessToken(user)
		res.status(200).json({ accessToken: accessToken });
	}
})

// Sign up page
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

// Endpoint for account creation
app.post('/signup/submit', (req, res) => {
    const stmt = db.prepare('INSERT INTO userinfo (user, pass, email, date_created) VALUES (?, ?, ?, ?)');
    if (req.body.pass !== req.body.confPass) res.status(400).json({message:"Bad Request (400)"})
    try {
        const info = stmt.run(req.body.user, md5(req.body.pass), req.body.email == '' ? null : req.body.email, helper.getTodaysDate());
        if(info.changes === 1) {
            res.status(201).json({message:"1 record created: ID " + info.lastInsertRowid + " (201)"})
        } else {
            res.status(400).json({message:"Bad Request (400)"})
        }
    } catch (error) {
        res.status(400).json({message:"Bad Request (400)", "error": error}) // remove error
    }
})

// Home page after login
app.get('/home', (req, res) => {
    res.render('home.ejs')
})

// Verift JWT
const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403)
        req.user = user
        next()
    })
}

// Generates access token (JWT)
const generateAccessToken = (user) => {
    //encrypts user information as JSON webtoken using access token
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});