const mysql = require('mysql');
let connection;

console.log("print from connection.js");
console.log(process.env.ENDPOINT);
console.log(process.env.PASSWORD);
console.log("end print from connection.js");

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.ENDPOINT,
        user: 'root',
        password: process.env.PASSWORD,
        database: 'todos_db'
    });
}

connection.on('connect', () => {
    console.log(`--> Connected to database '${connection.config.database}'.`);
});

connection.on('error', err => {
    console.log('--> Connection error: ', err);
});

connection.connect();

var sql = `
CREATE TABLE todos
(
    id INT NOT NULL AUTO_INCREMENT,
    task VARCHAR(255) NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);`;

connection.query(sql, function (err, result) {
	if (err) throw err;
	console.log("Table created");
});


module.exports = connection;
