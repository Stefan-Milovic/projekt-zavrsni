const mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '71420pale5401',
    database: 'projekt_baza',
    multipleStatements: true
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected');
});

module.exports = conn;