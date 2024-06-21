const query = require('../database/db').query
const config = require("../../config.json")
const Logger = require('./logger')
const version = require('../../package.json').version
const request = require('request');

const DBTables = [
    "wp_player_agents",
    "wp_player_gloves",
    "wp_player_knife",
    "wp_player_music",
    "wp_player_skins"
]

async function startup() {

    const GREEN = "\u001b[38;5;82m";
    const BLUE = "\u001b[38;5;51m";

    // TODO:
    // Make a system for checking new versions

    let width = 58
    let versionMessageMargin;
    let versionMessage = `Version:${BLUE} ${version}\x1b[0m`;

    versionMessageMargin = " ".repeat( (width - versionMessage.length) / 2 )

    console.log(`
    _____ _   _     _____ _                       
   |   __| |_|_|___|     | |_ ___ ___ ___ ___ ___ 
   |__   | '_| |   |   --|   | .'|   | . | -_|  _|
   |_____|_,_|_|_|_|_____|_|_|__,|_|_|_  |___|_|  
                                     |___|        
      ${versionMessageMargin}${versionMessage}
Website:${GREEN} https://github.com/L1teD/cs2-WeaponPaints-website \x1b[0m
`)


    checkTables()
    const register = (typeof config.enableStats == 'undefined') ? true : config.enableStats
    if (register) {
        registerInNetwork()
    }
}
async function checkTables() {
    Logger.sql.log("Start checking tables...")

    let quotedDBTables = "'" + DBTables.join("','") + "'";

    const results = await query(`SELECT table_name FROM information_schema.tables WHERE table_schema = "${config.DB.database}" AND table_name IN (${quotedDBTables})`)

    let tables = results.map(result => result.table_name || result.TABLE_NAME);
    let missingTables = [];

    if (tables.length === 0) throw new Error(
        Logger.sql.fatal("Check failed! - No tables found!")
    )

    DBTables.forEach(StaticTable => {
        if (!tables.includes(StaticTable)) missingTables.push(StaticTable); 
    });
    if (missingTables.length === 0) {
        Logger.sql.log("Check OK! - All tables are present")
    } else {
        throw new Error(
            Logger.sql.fatal("\x1b[37m\x1b[41mCheck failed! - Needed database tables are missing!\x1b[0m"+missingTables.map(missingTable => `\n\t\t\t\t\t  Missing Table: \x1b[1m\x1b[31m${missingTable}\x1b[0m`))
        ) 
    }
}

function registerInNetwork(params) {
    Logger.core.info("Sending a registration request to a stats server...")
    request.post(
        'https://stats.l1te.pw/',
        { form: { serverURL: config.HOST, serverIP: config.connect.serverIp, version: version } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                Logger.core.log(`Response from stats server - ${body}`);
            }
        }
    );
}


module.exports = {
    startup,
    DBTables
}
