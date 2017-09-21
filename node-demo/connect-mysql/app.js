const mysql = require('mysql');

const connection = mysql.createConnection({
    host : '60.205.181.95',
    user: 'crawler',
    password: 'crawler',
    database:'light-chaser'
});

connection.query('Select * from ota_calendar_price', (err,results,fields) => {
    if(err) {throw err;}
    console.log(results);
});

connection.end();