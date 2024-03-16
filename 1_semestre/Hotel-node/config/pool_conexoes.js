const mysql = require('mysql2')

/* const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORDITB,
    database: process.env.DB_NAME,
    port: process.env.BD_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
 */
 const pool = mysql.createPool({
    host: "localhost", 
    user: "root", 
    password: "Alexfarias123@V",
    database: "autenticacao",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if(err) 
        console.log(err)
    else
        console.log("Conectado ao SGBD!")
})

module.exports = pool.promise()
