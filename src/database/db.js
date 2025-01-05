const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
})

async function query(sql, params) {
    let connection = await pool.getConnection()
    try {
        let results = await connection.execute(sql)
        results = results[0]
        return results
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

module.exports = {
    query,
}
