const mysql = require('mysql2/promise');
const config = require('../../config.json');

const connection = mysql.createConnection(config.DB);

async function query(sql, params) {
    let connection = mysql.createPool(config.DB)
    try {
        let results = await connection.query(sql)
        results = results[0]
        return results;
    } finally {
        connection.releaseConnection();
    }  
}

module.exports = {
    query
}
