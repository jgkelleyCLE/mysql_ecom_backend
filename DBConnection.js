import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()


//LOCAL
// export const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: process.env.DB_PASS,
//     database: 'safariProducts'
// })

export const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE
})