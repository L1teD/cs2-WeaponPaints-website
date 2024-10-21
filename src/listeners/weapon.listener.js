const query = require('../database/db').query
const Logger = require('../utils/logger')

module.exports = (io, socket) => {
    async function changeKnife(data) {
        Logger.sql.trace(`User ${data.steamUserId} changed their knife to ${data.weaponid}`)
        const getKnife = await query(`SELECT * FROM wp_player_knife WHERE steamid = ${data.steamUserId}`)
        if (getKnife.length >= 1) {
            await query(`UPDATE wp_player_knife SET knife = '${data.weaponid}' WHERE steamid = ${data.steamUserId}`)
        } else {
            await query(`INSERT INTO wp_player_knife (steamid, weapon_team, knife) values (${data.steamUserId}, 0, '${data.weaponid}')`)
        }
        socket.emit('knife-changed', {knife: data.weaponid})
    }

    async function changeGloves(data) {
        Logger.sql.trace(`User ${data.steamUserId} changed their gloves to ${data.weaponid}`)
        const getGloves = await query(`SELECT * FROM wp_player_gloves WHERE steamid = ${data.steamUserId}`)
        if (getGloves.length >= 1) {
            await query(`UPDATE wp_player_gloves SET weapon_defindex = '${data.weaponid}' WHERE steamid = ${data.steamUserId}`)
        } else {
            await query(`INSERT INTO wp_player_gloves (steamid, weapon_team, weapon_defindex) values (${data.steamUserId}, 0, '${data.weaponid}')`)
        }
        socket.emit('glove-changed', {knife: data.weaponid})
    }

    async function changeAgent(data) {
        Logger.sql.trace(`User ${data.steamid} changed their agend to ${data.model}`)
        const getAgent = await query(`SELECT * FROM wp_player_agents WHERE steamid = ${data.steamid}`)
        if (getAgent.length >= 1) {
            await query(`UPDATE wp_player_agents SET agent_${data.team} = '${data.model}' WHERE steamid = ${data.steamid}`)
        } else {
            await query(`INSERT INTO wp_player_agents (steamid, agent_${data.team}) values (${data.steamid}, '${data.model}')`)
        }
        socket.emit('agent-changed', {
            agents: await query(`SELECT * FROM wp_player_agents WHERE steamid = ${data.steamid}`),
            currentAgent: data.model
        })
    }

    async function changeSkin(data) {
        Logger.sql.trace(`User ${data.steamid} changed their skin of ${data.weaponid} to ${data.paintid}`)

        const getSkin = await query(`SELECT * FROM wp_player_skins WHERE weapon_defindex = ${data.weaponid} AND steamid = ${data.steamid}`)

        if (getSkin.length >= 1) {
            await query(`UPDATE wp_player_skins SET weapon_paint_id = ${data.paintid} WHERE steamid = ${data.steamid} AND weapon_defindex = ${data.weaponid}`)
        } else {
            await query(`INSERT INTO wp_player_skins (steamid, weapon_defindex, weapon_team, weapon_paint_id) VALUES ( ${data.steamid}, ${data.weaponid}, 0, ${data.paintid})`)
        }

        const newSkins = await query(`SELECT * FROM wp_player_skins WHERE steamid = ${data.steamid}`)
        socket.emit('skin-changed', {weaponid: data.weaponid, paintid: data.paintid, newSkins: newSkins})
    }

    async function changeMusic(data) {
        Logger.sql.trace(`User ${data.steamid} changed their music kit to ${data.id}`)

        const getMusic = await query(`SELECT * FROM wp_player_music WHERE steamid = ${data.steamid}`)

        if (getMusic.length >= 1) {
            await query(`UPDATE wp_player_music SET music_id = ${data.id} WHERE steamid = ${data.steamid}`)
        } else {
            await query(`INSERT INTO wp_player_music (steamid, weapon_team, music_id) VALUES ( ${data.steamid}, 0, ${data.id} )`)
        }

        const newMusic = await query(`SELECT * FROM wp_player_music WHERE steamid = ${data.steamid}`)
        socket.emit('music-changed', {currentMusic: data.id, music: newMusic})
    }

    async function resetSkin(data) {
        await query(`DELETE FROM wp_player_skins WHERE steamid = ${data.steamid} AND weapon_defindex = ${data.weaponid}`)
        socket.emit('skin-reset', {weaponid: data.weaponid})
    }

    async function changeParams(data) {
        data.float = (data.float == '') ? '0.000001' : data.float
        data.pattern = (data.pattern == '') ? '1' : data.pattern
        
        await query(`UPDATE wp_player_skins SET weapon_wear = ${data.float}, weapon_seed = ${data.pattern} WHERE steamid = '${data.steamid}' AND weapon_defindex = ${data.weaponid} AND weapon_paint_id = ${data.paintid}`)
        socket.emit('params-changed')
    }

    socket.on("change-knife",    changeKnife);
    socket.on("change-glove",   changeGloves);
    socket.on("change-agent",    changeAgent);
    socket.on("change-skin",      changeSkin);
    socket.on("change-music",    changeMusic);
    socket.on("reset-skin",        resetSkin);
    socket.on("change-params",  changeParams);

    // socket.emit('change-params', {steamid: steamid, weaponid: weaponid, paintid: paintid, float: float, pattern: pattern})
}
