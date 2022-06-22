const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const PORT = process.env.PORT || 5050;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});