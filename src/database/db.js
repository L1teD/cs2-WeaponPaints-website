const mysql = require('mysql2/promise');
const config = require('../../config.json');

const connection = mysql.createConnection(config.DB);

async function query(sql, params) {
    let con = await connection
   
    let results = await con.query(sql)
    results = results[0]

    return results;
}

module.exports = {
    query
}