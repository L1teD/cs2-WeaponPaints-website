const query = require('../database/db').query
const config = require('../../config.json')
const Logger = require('./logger')

let langObj = require(`../lang/${config.lang}.json`)

const lang = {
    "navLogin": langObj.navLogin || "lang.navLogin",
    "navLogout": langObj.navLogout || "lang.navLogout",
    "navDelete": langObj.navDelete || "lang.navDelete",
    "connect": langObj.connect || "lang.connect",
    "profile": langObj.profile || "lang.profile",
    "sideMenu": {
        "knives": langObj.sideMenu.knives || "lang.sideMenu.knives",
        "gloves": langObj.sideMenu.gloves || "lang.sideMenu.gloves",
        "pistols": langObj.sideMenu.pistols || "lang.sideMenu.pistols",
        "rifles": langObj.sideMenu.rifles || "lang.sideMenu.rifles",
        "sniperRifles": langObj.sideMenu.sniperRifles || "lang.sideMenu.sniperRifles",
        "SMGs": langObj.sideMenu.SMGs || "lang.sideMenu.SMGs",
        "heavy": langObj.sideMenu.heavy || "lang.sideMenu.heavy",
        "utility": langObj.sideMenu.utility || "lang.sideMenu.utility",
        "ctAgents": langObj.sideMenu.ctAgents || "lang.sideMenu.ctAgents",
        "tAgents": langObj.sideMenu.tAgents || "lang.sideMenu.tAgents",
        "musicKits": langObj.sideMenu.musicKits || "lang.sideMenu.musicKits",
    },
    "modal": {
        "title": langObj.modal.title || "lang.modal.title",
        "float": langObj.modal.float || "lang.modal.float",

        "patternButtons": [
            {
                "shortName": langObj.modal.patternButtons[0].shortName || "lang.modal.patternButtons[0].shortName",
                "longName": langObj.modal.patternButtons[0].longName || "lang.modal.patternButtons[0].longName",
            },
            {
                "shortName": langObj.modal.patternButtons[1].shortName || "lang.modal.patternButtons[1].shortName",
                "longName": langObj.modal.patternButtons[1].longName || "lang.modal.patternButtons[1].longName",
            },
            {
                "shortName": langObj.modal.patternButtons[2].shortName || "lang.modal.patternButtons[2].shortName",
                "longName": langObj.modal.patternButtons[2].longName || "lang.modal.patternButtons[2].longName",
            },
            {
                "shortName": langObj.modal.patternButtons[3].shortName || "lang.modal.patternButtons[3].shortName",
                "longName": langObj.modal.patternButtons[3].longName || "lang.modal.patternButtons[3].longName",
            },
            {
                "shortName": langObj.modal.patternButtons[4].shortName || "lang.modal.patternButtons[4].shortName",
                "longName": langObj.modal.patternButtons[4].longName || "lang.modal.patternButtons[4].longName",
            }

        ],
        "pattern": langObj.modal.pattern || "lang.modal.pattern",

    },
    "selectCategory": langObj.selectCategory || "lang.selectCategory",
    "needLogin": langObj.needLogin || "lang.needLogin",
    "viaSteam": langObj.viaSteam || "lang.viaSteam",
    "change": langObj.change || "lang.change",
    "changeSkin": langObj.changeSkin || "lang.changeSkin",
}

async function getLoggedInUserInfo(req) {
    let session = req.session
    let [
        knife, 
        skins, 
        gloves, 
        agents,
        music,
    ] = await Promise.all(
        [
            query(`SELECT * FROM wp_player_knife WHERE steamid = ${req.user.id}`),
            query(`SELECT * FROM wp_player_skins WHERE steamid = ${req.user.id}`),
            query(`SELECT * FROM wp_player_gloves WHERE steamid = ${req.user.id}`),
            query(`SELECT * FROM wp_player_agents WHERE steamid = ${req.user.id}`),
            query(`SELECT * FROM wp_player_music WHERE steamid = ${req.user.id}`),
        ]
    )
    
    knife = knife[0]
    gloves = gloves[0]
    agents = agents[0]
    music = music[0]

    return {
        config: config,
        knife: knife,
        skins: skins,
        gloves: gloves,
        agents: agents,
        music: music,
        lang: lang,
        session: session,
        user: req.user
    }
}

async function getNotLoggedInUserInfo(req) {
    let session = req.session
    let lang = require(`../lang/${config.lang}.json`)

    return {
        config: config,
        session: session,
        user: req.user,
        lang: lang,
    }
}

async function deleteUserAccount(table, steamid) {
    query(`DELETE FROM ${table} WHERE steamid = ${steamid}`)
}

module.exports = {
    getLoggedInUserInfo,
    getNotLoggedInUserInfo,
    deleteUserAccount
}
