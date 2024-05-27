const log4js = require("log4js");
const config = require("../../config.json")

let core = log4js.getLogger("[Core]");
core.level = config.LOG_LEVEL;

let sql = log4js.getLogger("[SQL]");
sql.level = config.LOG_LEVEL;

let socket = log4js.getLogger("[Socket.io]");
socket.level = config.LOG_LEVEL;

module.exports = {
    core,
    sql,
    socket
}