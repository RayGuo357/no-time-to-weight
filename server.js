const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const PORT = process.env.PORT || 5050;
const db = require("./database.js")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signup.html')
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});