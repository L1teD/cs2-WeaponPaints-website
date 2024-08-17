const mysql = require('mysql2/promise');
const config = require('../../config.json');

const pool = mysql.createPool(config.DB);

async function query(sql, params) {
    let connection = await pool.getConnection()
    try {
        let results = await connection.execute(sql)
        results = results[0]
        return results;
    } finally {
        if (connection) {
            connection.release();
        }

    }
}

module.exports = {
    query
}
