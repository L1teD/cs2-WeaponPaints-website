const express = require('express')
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;
const mysql = require('mysql')
const path = require('path')
const config = require('./config.json');
const lang = require(`./lang/${config.lang}.json`)

const app = new express()

const PORT = config.PORT


const connection = mysql.createConnection({
    host: config.DB.DB_HOST,
    user: config.DB.DB_USER,
    database: config.DB.DB_DB,
    password: config.DB.DB_PASS
})
    connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Connected to MySQL!");
    }
});

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    // Initiate Strategy
    passport.use(new SteamStrategy({
    returnURL: 'http://localhost:' + PORT + '/api/auth/steam/return',
    realm: 'http://localhost:' + PORT + '/',
    apiKey: config.STEAMAPIKEY,
    }, function (identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
    ));
    app.use(session({
        secret: 'Whatever_You_Want',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 3600000
        }
    }))
    app.use(passport.initialize());
    app.use(passport.session());

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static('src/public'))

app.get('/', (req, res) => {
    if (typeof req.user != 'undefined') {
        connection.query('SELECT * FROM wp_player_knife WHERE steamid = ?', [req.user.id], (err, results, fields) => {
            connection.query('SELECT * FROM wp_player_skins WHERE steamid = ?', [req.user.id], (err, results2, fields) => {
                res.render('index', {
                    config: config,
                    session: req.session,
                    user: req.user,
                    knife: results[0],
                    skins: results2,
                    lang: lang,
                })

            })
        })
    } else {
        res.render('index', {config: config, session: req.session, user: req.user, lang: lang})
    }
    
    
    
    console.log(req.user, )
})

app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
    res.redirect('/')
});

app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        res.redirect('/')
    })
})

const server = app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})

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
            console.log(results)
            if (results.length >= 1) {
                console.log('EXISTS')
                connection.query('UPDATE wp_player_skins SET weapon_paint_id = ? WHERE steamid = ? AND weapon_defindex = ?', [data.paintid, data.steamid, data.weaponid], (err, results, fields) => {
                    connection.query('SELECT * FROM wp_player_skins WHERE steamid = ?', [data.steamid], (err, results2, fields) => {
                        socket.emit('skin-changed', {weaponid: data.weaponid, paintid: data.paintid, newSkins: results2})
                    })
                    
                })
            } else {
                console.log('NOT EXISTS')
                connection.query('INSERT INTO wp_player_skins (steamid, weapon_defindex, weapon_paint_id) VALUES (?, ?, ?)', [data.steamid, data.weaponid, data.paintid], (err, results, fields) => {
                    connection.query('SELECT * FROM wp_player_skins WHERE steamid = ?', [data.steamid], (err, results2, fields) => {
                        socket.emit('skin-changed', {weaponid: data.weaponid, paintid: data.paintid, newSkins: results2})
                    })
                })  
            }
    })

    socket.on('change-params', data => {
        console.log(data)
        connection.query('UPDATE wp_player_skins SET weapon_wear = ?, weapon_seed = ? WHERE steamid = ? AND weapon_defindex = ? AND weapon_paint_id = ?', [data.float, data.pattern, data.steamid, data.weaponid, data.paintid], (err, results, fields) => {
           console.log(results)
        })
    })
        
    })
})

// https://bymykel.github.io/CSGO-API/api/ru/skins.json