const log4js = require("log4js")

let core = log4js.getLogger("[Core]")
core.level = process.env.LOG_LEVEL

let sql = log4js.getLogger("[SQL]")
sql.level = process.env.LOG_LEVEL

let socket = log4js.getLogger("[Socket.io]")
socket.level = process.env.LOG_LEVEL

module.exports = {
    core,
    sql,
    socket,
}
