const express = require('express')
const passport = require('passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passportSteam = require('passport-steam')
const SteamStrategy = passportSteam.Strategy
const mysql = require('mysql')
const path = require('path')

// load configuration files
const config = require('./config.json');
config.SUBDIR = '/'
const lang = require(`./lang/${config.lang}.json`)

const app = new express()

const PORT = config.PORT

let returnURL = `${config.PROTOCOL}://${config.HOST}${config.SUBDIR}api/auth/steam/return`
let realm = `${config.PROTOCOL}://${config.HOST}${config.SUBDIR}`

if (config.HOST == 'localhost' || config.HOST == '127.0.0.1') {
    returnURL = `${config.PROTOCOL}://${config.HOST}:${config.PORT}${config.SUBDIR}api/auth/steam/return`
    realm = `${config.PROTOCOL}://${config.HOST}:${config.PORT}${config.SUBDIR}`
}

// connect to db
const connection = mysql.createConnection({
    host: config.DB.DB_HOST,
    user: config.DB.DB_USER,
    database: config.DB.DB_DB,
    password: config.DB.DB_PASS,
    port: config.DB.DB_PORT
})
connection.connect(function(err){
    if (err) {
        return console.error("Error: " + err.message);
    }
    else{
        console.log("Connected to MySQL!");
    }
});

// heartbeat for db
setInterval(() => {
    connection.query('SELECT 1', (err, res, fields) => {})
}, 10000);

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static('src/public'))

const fileStoreOptions = {logFn: function(){}}

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
// Initiate Strategy
passport.use(new SteamStrategy({
    returnURL: returnURL,
    realm: realm,
    apiKey: config.STEAMAPIKEY,
}, function (identifier, profile, done) {
    process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
    });
}
));
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: config.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 3600000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.get(config.SUBDIR, (req, res) => {
    if (typeof req.user != 'undefined') {
        connection.query('SELECT * FROM wp_player_knife WHERE steamid = ?', [req.user.id], (err, results, fields) => {
            connection.query('SELECT * FROM wp_player_skins WHERE steamid = ?', [req.user.id], (err, results2, fields) => {
                connection.query('SELECT * FROM wp_player_agents WHERE steamid = ?', [req.user.id], (err, results3, fields) => {
                    res.render('index', {
                        config: config,
                        session: req.session,
                        user: req.user,
                        knife: results[0],
                        skins: results2,
                        agents: results3[0],
                        lang: lang,
                        subdir: config.SUBDIR
                    })
                })
            })
        })
    } else {
        res.render('index', {config: config, session: req.session, user: req.user, lang: lang, subdir: config.SUBDIR})
    }
})

app.get(`${config.SUBDIR}api/auth/steam`, passport.authenticate('steam', {failureRedirect: config.SUBDIR}), function (req, res) {
    res.redirect('/')
});

app.get(`${config.SUBDIR}api/auth/steam/return`, passport.authenticate('steam', {failureRedirect: config.SUBDIR}), function (req, res) {
    res.redirect('/')
});

app.get(`${config.SUBDIR}api/logout`, (req, res) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
})

app.get('/api/delete', (req, res) => {
    connection.query("DELETE FROM wp_player_knife WHERE steamid = ?", [req.user.id], (err, results, fields) => {
        connection.query("DELETE FROM wp_player_skins WHERE steamid = ?", [req.user.id], (err, results, fields) => {
            req.session.destroy(err => {
                res.redirect('/')
            })
        })
    })
})

// do right redirect
if (config.SUBDIR != '/') {
    app.get('/', (req, res) => {
        res.redirect(config.SUBDIR.slice(0, -1))
    })
}

// start server
const server = app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

// initialize socket.io
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('Socket connected')
    
    socket.on('change-knife', data => {
            connection.query('SELECT * FROM wp_player_knife WHERE steamid = ?', [data.steamUserId], (err, results, fields) => {
                if (results.length >= 1) {
                    connection.query('UPDATE wp_player_knife SET knife = ? WHERE steamid = ?', [data.weaponid, data.steamUserId], (err, results, fields) => {
                        socket.emit('knife-changed', {knife: data.weaponid})
                    })
                } else {
                    connection.query('INSERT INTO wp_player_knife (steamid, knife) values (?, ?)', [data.steamUserId, data.weaponid], (err, results, fields) => {
                        socket.emit('knife-changed', {knife: data.weaponid})
                    })
                }
            })
        
    })

    socket.on('change-skin', data => {
        connection.query('SELECT * FROM wp_player_skins WHERE weapon_defindex = ? AND steamid = ?', [data.weaponid, data.steamid], (err, results, fields) => {
            if (results.length >= 1) {
                connection.query('UPDATE wp_player_skins SET weapon_paint_id = ? WHERE steamid = ? AND weapon_defindex = ?', [data.paintid, data.steamid, data.weaponid], (err, results, fields) => {
                    connection.query('SELECT * FROM wp_player_skins WHERE steamid = ?', [data.steamid], (err, results2, fields) => {
                        socket.emit('skin-changed', {weaponid: data.weaponid, paintid: data.paintid, newSkins: results2})
                    })
                    
                })
            } else {
                connection.query('INSERT INTO wp_player_skins (steamid, weapon_defindex, weapon_paint_id) VALUES (?, ?, ?)', [data.steamid, data.weaponid, data.paintid], (err, results, fields) => {
                    connection.query('SELECT * FROM wp_player_skins WHERE steamid = ?', [data.steamid], (err, results2, fields) => {
                        socket.emit('skin-changed', {weaponid: data.weaponid, paintid: data.paintid, newSkins: results2})
                    })
                })  
            }
        })
    })

    socket.on('change-agent', data => {   
        connection.query('SELECT * FROM wp_player_agents WHERE steamid = ?', [data.steamid], (err, results, fields) => {
            if (err) throw err;
            if (results.length >= 1) {
                connection.query(`UPDATE wp_player_agents SET agent_${data.team} = ? WHERE steamid = ?`, [data.model, data.steamid], (err, results, fields) => {
                    if (err) throw err;
                    connection.query('SELECT * FROM wp_player_agents WHERE steamid = ?', [data.steamid], (err, results2, fields) => {
                        if (err) throw err;
                        socket.emit('agent-changed', {agents: results2, currentAgent: data.model})
                    })
                    
                })
            } else {
                connection.query(`INSERT INTO wp_player_agents (steamid, agent_${data.team}) VALUES (?, ?)`, [data.steamid, data.model], (err, results, fields) => {
                    if (err) throw err;
                    connection.query('SELECT * FROM wp_player_agents WHERE steamid = ?', [data.steamid], (err, results2, fields) => {
                        if (err) throw err;
                        socket.emit('agent-changed', {agents: results2, currentAgent: data.model})
                    })
                })  
            }
        })
    })

    socket.on('change-params', data => {
        connection.query('UPDATE wp_player_skins SET weapon_wear = ?, weapon_seed = ? WHERE steamid = ? AND weapon_defindex = ? AND weapon_paint_id = ?', [data.float, data.pattern, data.steamid, data.weaponid, data.paintid], (err, results, fields) => {
            socket.emit('params-changed')
        })
    })

    socket.on('reset-skin', data => {
        connection.query('DELETE FROM wp_player_skins WHERE steamid = ? AND weapon_defindex = ?', [data.steamid, data.weaponid], (err, results, fields) => {
            socket.emit('skin-reset', {weaponid: data.weaponid})
        })
    })
        
    
})
