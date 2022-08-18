const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
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

})

// Sign up page
app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

// Endpoint for account creation
app.post('/signup/submit', (req, res) => {
    const stmt = db.prepare('INSERT INTO userinfo (user, pass, email, date_created) VALUES (?, ?, ?, ?)');
    try {
        const info = stmt.run(req.body.user, req.body.pass, req.body.email == '' ? null : req.body.email, helper.getTodaysDate());
        if(info.changes === 1) {
            res.status(201).json({message:"1 record created: ID " + info.lastInsertRowid + " (201)"})
        } else {
            res.status(400).json({message:"Bad Request (400)"})
        }
    } catch (error) {
        res.status(400).json({message:"Bad Request (400)", "error": error}) // remove error
    }
})

app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});