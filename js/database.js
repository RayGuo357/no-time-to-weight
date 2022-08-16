// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('./db/user.db');
db.exec('PRAGMA foreign_keys = ON')
// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.

/* 

userinfo
_____________________________________________________________________________________________
| id                    | user          | pass  | email         | date_created  | public    |
| INTEGER PRIMARY KEY   | TEXT UNIQUE   | TEXT  | TEXT UNIQUE   | INTEGER       | INTEGER   |
_____________________________________________________________________________________________


 weight
_________________________________________________________________________________
| id                            | userid        | weight        | date_entered  |
| INTEGER PRIMARY KEY NOT NULL  | FOREIGN KEY   | REAL NOT NULL | INTEGER       |
_________________________________________________________________________________

*/
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                user TEXT UNIQUE, 
                                pass TEXT, 
                                email TEXT UNIQUE,
                                date_created INTEGER
                                public INTEGER NOT NULL DEFAULT 0,
                                CHECK (public IN (0,1)));
        CREATE TABLE weight (   weight_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                user_id INTEGER NOT NULL, 
                                weight REAL NOT NULL, 
                                date_entered INTEGER,
                                FOREIGN KEY (user_id) REFERENCES userinfo (id) ON DELETE CASCADE ON UPDATE CASCADE);
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and one entry containing a username and password.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db